import { Laptop, Headphones, Armchair } from "lucide-react";
import { type WorkspaceItem } from "@/types/workspace";

const imagesPath = "/images/workspaces";

export const WorkspaceIcons = {
  Hardware: Laptop,
  Accessory: Headphones,
  Furniture: Armchair
};

// export const WorkspaceBanner = `${imagesPath}/banner.jpg`;

export const WorkspaceData: WorkspaceItem[] = [
  {
    category: "Hardware",
    items: [
      {
        name: "Apple MacBook Pro 15” (2019)",
        description: "My main development machine for daily work.",
        image: `${imagesPath}/macbook_pro.jpeg`
      },
      {
        name: "Dell 7440",
        description: "My secondary development machine for daily work.",
        image: `${imagesPath}/dell_latitude.jpg`
      },
      {
        name: "Dell Monitor",
        description: "My primary external display for multi-monitor setups.",
        image: `${imagesPath}/dell_monıtor.jpg`
      },
    ]
  },
  {
    category: "Accessory",
    items: [
      {
        name: "Keyboard",
        description: "My primary keyboard for typing.",
        image: `${imagesPath}/logi_klavye.jpg`
      },
      {
        name: "Apple Magic Mouse",
        description: "One-cable setup for display, charging, and peripherals.",
        image: `${imagesPath}/magic_mouse.jpg`
      },
      {
        name: "Airpods Pro 3",
        description: "My primary headphones for listening to music and podcasts.",
        image: `${imagesPath}/airpods.avif`
      },
      
      {
        name: "Mechanical / Compact Keyboard",
        description: "Comfortable typing for long coding sessions.",
        image: `${imagesPath}/xg8.webp`
      },
      {
        name: "Jbl Headphones",
        description: "My secondary headphones for listening to music and podcasts.",
        image: `${imagesPath}/jbl.webp`
      },
      {
        name: "Charging Stand",
        description: "Keeps phone and accessories charged and tidy.",
        image: `${imagesPath}/charger.jpg`
      },
    ]
  },
  {
    category: "Furniture",
    items: [
      {
        name: "Desk",
        description: "My primary desk for working.",
        image: `${imagesPath}/ahsap.avif`
      },
      {
        name: "Chair",
        description: "My primary chair for sitting.",
        image: `${imagesPath}/sandalye.jpg`
      },
    ]
  }
];