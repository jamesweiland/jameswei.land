import rss from '@astrojs/rss';
import siteConfig from '../data/site-config.ts';
import { getPosts } from '../utils/data-utils.ts';

export async function GET(context) {
    const posts = await getPosts();
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: posts.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: `/posts/${item.id}/`,
            pubDate: item.data.publishDate
        }))
    });
}
