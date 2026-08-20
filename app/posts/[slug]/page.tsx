import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Post, extractIdFromSlug } from "../../types";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Force Server-Side Rendering (SSR) dynamically on every request
export const dynamic = "force-dynamic";

async function fetchPostById(id: number): Promise<Post | null> {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      cache: "no-store", // SSR fetch: bypass caching for fresh real-time dynamic requests
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postId = extractIdFromSlug(slug);
  const post = await fetchPostById(postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | PulseBlog`,
    description: post.body.slice(0, 160),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postId = extractIdFromSlug(slug);
  const post = await fetchPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all articles
        </Link>
      </div>

      {/* Header Container */}
      <header className="mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200/60 dark:border-violet-800/60 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
            Dynamic SSR Route
          </span>
          <span className="text-xs font-mono text-zinc-400">
            ID: #{post.id}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Metadata & Tags */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
              <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {post.reactions?.likes ?? 0} likes
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views ?? 0} views
            </span>
            <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-500">
              Author ID: {post.userId}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <section className="prose dark:prose-invert prose-lg max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed">
        <p className="text-lg sm:text-xl font-normal leading-8 sm:leading-9">
          {post.body}
        </p>
      </section>

      {/* Live API Info Box */}
      <div className="mt-14 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/20 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-900/20 border border-indigo-100/60 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-2">
          SSR Execution Detail
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
          This post is rendered dynamically via Server-Side Rendering (SSR) fetching on-demand from:
        </p>
        <code className="text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-white/80 dark:bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800 block overflow-x-auto">
          https://dummyjson.com/posts/{post.id}
        </code>
      </div>
    </article>
  );
}
