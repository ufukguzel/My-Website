import { GetMetada } from "@/lib/page-metadata";
import PlaygroundClient from "./playground-client";

export const metadata = GetMetada("playground");

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}

