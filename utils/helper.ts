export function sortByDate(a: any, b: any): number {
  const oldPost = new Date(a.frontmatter.date);
  const newPost = new Date(b.frontmatter.date);
  const result = (+newPost - +oldPost)!;
  return result;
}
