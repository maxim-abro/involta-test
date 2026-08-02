import Parser from 'rss-parser'
import { rssSources } from '#shared/data/rss-sources.ts'
import type { IRssItem } from '#shared/types/rss.ts'

const parser = new Parser()

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : String(error)
}

export default cachedEventHandler(async () => {
  const results = await Promise.all(
    rssSources.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.url);

        return {
          status: 'fulfilled' as const,
          source,
          items: feed.items.map<IRssItem>((item) => ({
            sourceId: source.id,
            sourceName: source.name,
            title: item.title,
            link: item.link,
            date: item.isoDate || item.pubDate,
            description: item.contentSnippet,
            image: item?.enclosure?.url,
          })),
        };
      } catch (error) {
        return {
          status: 'rejected' as const,
          source,
          error,
        };
      }
    }),
  );

  const successfulSources = results.filter((result) => result.status === 'fulfilled');
  const failedSources = results.filter((result) => result.status === 'rejected');

  failedSources.forEach((result) => {
    console.warn(`Failed to load RSS source "${result.source.id}": ${getErrorMessage(result.error)}`);
  });

  const items = successfulSources
    .flatMap((result) => result.items);

  if (!successfulSources.length) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to load RSS sources',
    });
  }

  return items;
}, {
  name: 'rss-feed',
  getKey: () => 'all',
  maxAge: 300,
  swr: true,
});
