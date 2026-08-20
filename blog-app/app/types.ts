export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export function slugify(title: string, id: number): string {
  const cleanTitle = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${cleanTitle}-${id}`;
}

export function extractIdFromSlug(slug: string): number {
  // If slug is purely a number (e.g., '1')
  if (/^\d+$/.test(slug)) {
    return parseInt(slug, 10);
  }
  // If slug is 'title-name-1'
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  const parsed = parseInt(lastPart, 10);
  return isNaN(parsed) ? 1 : parsed;
}
