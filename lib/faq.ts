export type Faq = { q: string; a: string };

/* Some CMS article bodies end with a Markdown FAQ section:
     ## FAQs
     ### Question?
     Answer...
   Pull that out so it can render as an accordion instead of flat text. */
export function extractFaqs(md: string): { body: string; faqs: Faq[] } {
  if (!md) return { body: "", faqs: [] };

  const heading = md.match(
    /(?:^|\n)#{2,3}\s*(?:FAQs?|Frequently Asked Questions)\s*(?:\n|$)/i,
  );
  if (!heading || heading.index === undefined) return { body: md, faqs: [] };

  const body = md.slice(0, heading.index).trim();
  const block = md.slice(heading.index + heading[0].length);

  const faqs: Faq[] = [];
  for (const part of block.split(/\n(?=#{2,4}\s)/)) {
    const m = part.match(/^#{2,4}\s+(.+?)\s*\n([\s\S]*)$/);
    if (!m) continue;
    const q = m[1].replace(/\*\*/g, "").trim();
    const a = m[2]
      .replace(/\*\*/g, "")
      .replace(/\s*\n\s*/g, " ")
      .trim();
    if (q && a) faqs.push({ q, a });
  }

  return { body, faqs };
}
