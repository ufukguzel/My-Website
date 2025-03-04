export type Highlight = {
    year: string;
    events: HighlightItem[];
};

export type HighlightItem = {
    title: string;
    description?: string;
    imageUrl?: string;
}