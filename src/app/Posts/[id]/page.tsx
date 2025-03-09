import { notFound } from 'next/navigation';
import { fetchSinglePostData } from '@/app/action/singlePost';


interface Params {
    id: string
}

interface PageProps {
    params: Promise<Params>
}

export default async function SinglePostPage({ params }: PageProps) {
    const { id } =await params;

    const singlePost = await fetchSinglePostData(Number(id));

    if (!singlePost) {
        return notFound();
    }

    return (
        <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-40 text-white max-w-[100vw] mx-auto">
            <div className="mt-5 w-full"></div>

            <div className='text-white font-bold text-2xl sm:text-3xl md:text-4xl my-4 leading-snug'>
                {singlePost.title}
            </div>

            <div className='text-lg sm:text-xl text-justify text-gray-400 font-light leading-8 sm:leading-9'>
                <div>
                    {singlePost.body.repeat(9)}
                </div>
            </div>

            <div className='my-10 font-bold text-xl sm:text-2xl md:text-3xl'>
                {singlePost.authorName}
            </div>
        </div>
    );
}
