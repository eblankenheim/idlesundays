// Single source of truth for anything that shows up in metadata, structured
// data, the sitemap, or robots.txt.

export const SITE_NAME = "IdleSundays";
export const SITE_URL = "https://idlesundays.com";

export const SITE_DESCRIPTION =
  "IdleSundays is a Wisconsin car and bike community running scenic backroads cruises and monthly meet-ups. See upcoming events, routes, and how to join.";

export const FACEBOOK_URL = "https://www.facebook.com/share/g/18Q3Uf6vyR/";
export const INSTAGRAM_URL = "https://www.instagram.com/idlesundays.wi/";

export const SOCIAL_LINKS = [FACEBOOK_URL, INSTAGRAM_URL];

/** Absolute URL for a route, honouring the trailing-slash static export. */
export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  const trimmed = path.replace(/^\/|\/$/g, "");
  return `${SITE_URL}/${trimmed}/`;
}

/** Trimmed, single-line text capped at `max` characters for meta descriptions. */
export function toMetaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}
