export type Bookmark = {
    _id: string;
    title: string;
    excerpt: string;
    link: string;
    cover: string;
    tags?: string[];
    created?: string;
};