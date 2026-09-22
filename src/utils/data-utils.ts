import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';
import {execSync} from 'node:child_process';

export function sortItemsByDateDesc(itemA: CollectionEntry<'blog' | 'projects'>, itemB: CollectionEntry<'blog' | 'projects'>) {
    return itemB.data.publishDate.getTime() - new Date(itemA.data.publishDate).getTime();
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
    const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
    return tags
        .map((tag) => {
            return {
                name: tag,
                id: slugify(tag)
            };
        })
        .filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
        });
}

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tagId: string) {
    const filteredPosts: CollectionEntry<'blog'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
    return filteredPosts;
}

export async function getPostsByProject(projectId: string) {
    const posts = await getBlogPosts();
    return posts.filter((post) => post.data.project?.id === projectId);
}

export function getGitPublishDate(fp: string) {
    try {
        const output = execSync(
            `git log -1 --format=%aI -- "${fp}"`, {encoding: 'utf-8'}
        ).trim();
        return output ? new Date(output) : new Date();
    } catch (e) {
        console.warn(`An error occurred getting the publish date for ${fp}: ${e?.message}`)
    }
}


// filter by isPrivate, sort by date

export async function getBlogPosts() {
    return (await getCollection("blog", ({data}) => import.meta.env.PROD ? !data.isPrivate : true)).sort(sortItemsByDateDesc);
}

export async function getProjects() {
    return (await getCollection("projects", ({data}) => import.meta.env.PROD ? !data.isPrivate : true)).sort(sortItemsByDateDesc);
}

