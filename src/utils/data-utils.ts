import { getCollection, type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';
import { existsSync, readFileSync } from "node:fs";

export function sortItemsByDateDesc(itemA: CollectionEntry<'posts' | 'projects'>, itemB: CollectionEntry<'posts' | 'projects'>) {
    const itemAPublishDate = getGitPublishDate(itemA.id);
    const itemBPublishDate = getGitPublishDate(itemB.id);
    return (itemBPublishDate.getTime()) - (itemAPublishDate.getTime());
}

export function getAllTags(posts: CollectionEntry<'posts'>[]) {
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

export function getPostsByTag(posts: CollectionEntry<'posts'>[], tagId: string) {
    const filteredPosts: CollectionEntry<'posts'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
    return filteredPosts;
}

export async function getPostsByProject(projectId: string) {
    const posts = await getPosts();
    return posts.filter((post) => post.data.project?.id === projectId);
}

let publishDates: Record<string, string> = {};
const datesPath = "src/publish-dates.json";

if (existsSync(datesPath)) {
    publishDates = JSON.parse(readFileSync(datesPath, 'utf-8'));
} else {
    console.warn(`${datesPath} not found!`)
}

// this takes either a project or post id
export function getGitPublishDate(id: string) {
    console.log(`getGitPublishDate called with: ${id}`)
    const date = publishDates[id];
    return date ? new Date(date) : new Date();
}

// filter by isPrivate, sort by date

export async function getPosts() {
    return (await getCollection("posts", ({data}) => import.meta.env.PROD ? !data.isPrivate : true)).sort(sortItemsByDateDesc);
}

export async function getProjects() {
    return (await getCollection("projects", ({data}) => import.meta.env.PROD ? !data.isPrivate : true)).sort(sortItemsByDateDesc);
}

