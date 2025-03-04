import { MediumPost } from "./medium-post";

export type MediumFeed = {
    posts: MediumPost[];
    total: number;
};