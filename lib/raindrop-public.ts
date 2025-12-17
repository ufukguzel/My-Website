import sanitizeHtml from "sanitize-html";

type PublicBookmark = {
  _id: string;
  title: string;
  excerpt: string;
  link: string;
  cover: string;
  tags: string[];
  created: string;
};

function pickCdata(text: string) {
  const cdata = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (cdata?.[1] ?? text).trim();
}

function extractTag(block: string, tag: string) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? pickCdata(m[1]) : "";
}

function extractAttr(block: string, tag: string, attr: string) {
  const m = block.match(new RegExp(`<${tag}[^>]*${attr}="([^"]+)"[^>]*>`, "i"));
  return m ? m[1] : "";
}

export async function getPublicBookmarksFromRss(options: {
  username: string;
  slugWithId: string; // e.g. "bookmarks-52929212"
}) {
  const { username, slugWithId } = options;
  const candidates = [
    `https://raindrop.io/${username}/${slugWithId}/rss`,
    `https://raindrop.io/collection/${slugWithId.replace(/^\D+/, "")}/rss`,
  ];

  let rssText = "";
  let lastError: unknown;

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
      rssText = await res.text();
      if (rssText.includes("<item")) break;
    } catch (e) {
      lastError = e;
    }
  }

  if (!rssText) {
    throw lastError ?? new Error("No RSS response");
  }

  const items = rssText.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  const bookmarks: PublicBookmark[] = items.slice(0, 50).map((itemBlock, idx) => {
    const titleRaw = extractTag(itemBlock, "title");
    const link = extractTag(itemBlock, "link");
    const pubDate = extractTag(itemBlock, "pubDate");
    const descriptionRaw = extractTag(itemBlock, "description");

    const excerpt =
      sanitizeHtml(descriptionRaw, { allowedTags: [] }).trim().slice(0, 180) ||
      "";

    const cover =
      extractAttr(itemBlock, "media:content", "url") ||
      extractAttr(itemBlock, "enclosure", "url") ||
      "";

    return {
      _id: `${link || "rss"}-${idx}`,
      title: titleRaw,
      excerpt,
      link,
      cover,
      tags: [],
      created: pubDate || new Date().toISOString(),
    };
  });

  return bookmarks;
}


