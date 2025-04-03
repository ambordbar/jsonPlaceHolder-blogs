import { notFound } from "next/navigation";
import { fetchSinglePostData } from "@/app/action/post/singlePost";
import { Metadata } from "next";

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchSinglePostData(Number(id));

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.body.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.body.substring(0, 160),
      type: "article",
      authors: post.authorName ? [post.authorName] : [],
      publishedTime: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.body.substring(0, 160),
    },
  };
}

export default async function SinglePostPage({ params }: PageProps) {
  const { id } = await params;

  const singlePost = await fetchSinglePostData(Number(id));

  if (!singlePost) {
    return notFound();
  }

  return (
    <div className=" text-white max-w-[100vw] mx-auto">
      <div className="mt-5 w-full"></div>

      <div className="text-white font-bold text-2xl sm:text-3xl md:text-4xl my-4 leading-snug">
        {singlePost.title}
      </div>

      <div className="text-lg sm:text-xl text-justify text-gray-400 font-light leading-8 sm:leading-9">
        <div>{singlePost.body.repeat(9)}</div>
      </div>

      <div className="my-10 font-bold text-xl sm:text-2xl md:text-3xl">
        {singlePost.authorName}
      </div>
    </div>
  );
}
