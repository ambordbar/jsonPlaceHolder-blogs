import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchSinglePostData } from '@/app/action/singlePost';


interface Params {
    id: string
}

interface pageProps {
    params: Promise<Params>;
}

export default async function SinglePostPage({ params }: pageProps) {
    const { id } = await params;
    const singlePost = await fetchSinglePostData(Number(id));

    if (!singlePost) {
        return notFound();
    }

    return (
        <div className="mx-4 xs:mx:6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40 text-white">
            <div className="mt-5 w-full">
                <Image
                    src="/image/singleImage.jpg"
                    alt="this is a picture"
                    width={1920}
                    height={1080}
                    className="rounded-xl"
                    priority={true}
                />
            </div>
            <div className='text-white font-bold text-2xl my-4'>{singlePost.title}</div>
            <div className='text-lg text-justify text-gray-600 font-thin'>

                <div>
                    {singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}
                    {singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}
                </div>
                <div className='mt-20'>
                    {singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}{singlePost.body}
                </div>
            </div>
            <div className='my-10 font-bold text-2xl'>{singlePost.authorName}</div>
        </div>
    );
}
