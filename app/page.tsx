import Link from "next/link";
import { Post, slugify } from "./types";
import localPostsData from "../posts.json";

// SSG: Load posts from bundled local json directly
async function getLocalPosts(): Promise<Post[]> {
  try {
    return (localPostsData as { posts?: Post[] })?.posts || [];
  } catch (error) {
    console.error("Error reading local posts data:", error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getLocalPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="mb-14 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Static Site Generation (SSG)
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          Discover Stories & <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Fresh Perspectives
          </span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          Statically pre-rendered feed loaded directly from{" "}
          <code className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">
            posts.json
          </code>{" "}
          powered by the{" "}
          <a
            href="https://dummyjson.com/posts"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-indigo-500"
          >
            DummyJSON API
          </a>
          .
        </p>
      </section>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const postSlug = slugify(post.title, post.id);
          return (
            <article
              key={post.id}
              className="group flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                {/* Tags & Meta */}
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-3">
                  <Link href={`/posts/${postSlug}`}>{post.title}</Link>
                </h2>

                {/* Snippet */}
                <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed mb-6">
                  {post.body}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-medium">
                    <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    {post.reactions?.likes ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.views ?? 0}
                  </span>
                </div>

                <Link
                  href={`/posts/${postSlug}`}
                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform"
                >
                  Read Post
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
