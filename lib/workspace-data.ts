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
        name: "Apple Mac Mini 2024",
        description: "M4 Pro, 12-core cpu, 16-core gpu, 24gb ram, 512gb ssd",
        image: `${imagesPath}/mac-mini-2024.jpg`
      },
      {
        name: "LG UltraWide Curved Monitor",
        description: "37.5 inch 38WR85QC-W 144Hz 1ms QHD",
        image: `${imagesPath}/lg-ultrawide.jpg`
      },
      {
        name: "Asus ZenScreen MB16ACv Portable Monitor",
        description: "15.6 inch, ips, 1920x1080, 5ms, usb type-c, matte screen, low blue light, antibacterial",
        image: `${imagesPath}/asus-zenscreen.jpg`
      },
      {
        name: "Logitech MX Keys Mini Keyboard",
        description: "White, multiple devices, US international",
        image: `${imagesPath}/logitech-mx-keys-mini.jpg`
      },
      {
        name: "Logitech Lift Mouse",
        description: "White, multiple devices, ergonomic",
        image: `${imagesPath}/logitech-lift-mouse.jpg`
      },
      {
        name: "Apple Magic Tracpad",
        description: "White, multi-touch surface",
        image: `${imagesPath}/magic-tracpad.jpg`
      },
    ]
  },
  {
    category: "Accessory",
    items: [
      {
        name: "Ikea Lanespelare Mouse Pad",
        description: "Patterned, 90x40",
        image: `${imagesPath}/ikea-mouse-pad.jpg`
      },
      {
        name: "Huawei Freebuds Pro 3 Headphones",
        description: "Ice grey, smart noise cancelling",
        image: `${imagesPath}/huawei-freebuds-pro3.jpg`
      },
      {
        name: "InfinityLab InstantStation Wireless Charger Stand",
        description: "White, 33W, USB-C/USB-A, QI fast charging",
        image: `${imagesPath}/infinitylab-instantstation.jpg`
      },
      {
        name: "Logitech C720 HD Webcam",
        description: "Black, 720p/30fps, usb, mono noise-canceling microphone",
        image: `${imagesPath}/logitech-c270-webcam.jpg`
      },
    ]
  },
  {
    category: "Furniture",
    items: [
      {
        name: "Ikea Mittzon Desk",
        description: "140x80, white",
        image: `${imagesPath}/ikea-mittzon-desk.jpg`
      },
      {
        name: "Ikea Markus Chair",
        description: "Light grey",
        image: `${imagesPath}/ikea-markus-grey.jpg`
      },
    ]
  }
];