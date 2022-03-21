/**
 * Normalize html string by removing html tags
 *
 * @param html - string of html to normalize
 * @returns normalized text
 */
export function normalizeHTML(html: string) {
  return html.replace(/<\/?[^>]+(>|$)/g, '').replace(/&[A-Za-z0-9#]+;/g, '');
}
