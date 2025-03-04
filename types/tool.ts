import { LucideIcon } from "lucide-react";

export type Tool = {
    category: string;
    icon: LucideIcon;
    items: ToolItem[]
};

export type ToolItem = {
    name: string;
    description: string;
};