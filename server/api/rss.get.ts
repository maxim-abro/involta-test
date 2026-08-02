import Parser from 'rss-parser'
import { rssSources } from '../../shared/data/rss-sources'
import type { IRssItem } from '../types/rss'

const parser = new Parser()

export default defineEventHandler(async () => {
  const results = await Promise.allSettled(
    rssSources.map(async (source) => {
      const feed = await parser.parseURL(source.url);

      return feed.items.map<IRssItem>((item) => ({
        sourceId: source.id,
        sourceName: source.name,
        title: item.title,
        link: item.link,
        date: item.isoDate || item.pubDate,
        description: item.contentSnippet,
        image: item?.enclosure?.url,
      }));
    }),
  );

  return results
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value)
});
