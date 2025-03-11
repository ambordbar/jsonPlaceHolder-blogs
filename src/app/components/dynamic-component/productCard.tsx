'use client'
import Image from 'next/image';
import Pencil from '../../../../public/svg/writer.svg'
import { useRouter } from 'next/navigation';

interface CardProps {
    indexCard: number;
    title: string;
    body: string;
    userName: string | undefined;
    className?: string;
}

export default function Card({ indexCard, title, body, userName,  }: CardProps) {
    const router = useRouter();

    // const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>(
    //     items.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
    // );
    // const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
    // const [hovered, setHovered] = useState(false);

    // const toggleLike = (indexCard: number) => {
    //     setLikedPosts(prev => ({
    //         ...prev,
    //         [indexCard]: !prev[indexCard]
    //     }));

    //     // setLikeCounts(prev => ({
    //     //     ...prev,
    //     //     [indexCard]: likedPosts[indexCard] ? prev[indexCard] - 1 : prev[indexCard] + 1
    //     // }));
    // };

    const handleArrowClick = () => {
        const pagePath = '/Posts';
        router.push(`${pagePath}/${indexCard}`);
    };

    return (
        <div
            onClick={handleArrowClick}
            className={`rounded-3xl py-10 border border-gray-900 px-4 w-full min-h-[230px] hover:bg-customBorderColor hover:border-gray-700 cursor-pointer transition-colors duration-500`}>
            {/* <div className="relative">
                <div className='absolute top-2 right-2'>
                    <Buttons label={
                        <div className="items-center">
                            {!likedPosts[indexCard] ?
                                <Image src={HeartStroke} alt="Not Liked" width={24} height={24} className='transition-all duration-500 transform scale-100 hover:scale-110' />
                                :
                                <Image src={HeartFill} alt="Liked" width={24} height={24} className='transition-all duration-500 transform scale-100 hover:scale-110' />
                            }
                            <span className="text-xs text-gray-500">{likeCounts[indexCard]}</span>
                        </div>
                    }
                        className="bg-gray-800 text-whiteTitle"
                        onClick={() => toggleLike(indexCard)} />
                </div>
            </div> */}
            <div className="mt-1">
                <div>
                    <div className="font-normal text-whiteTitle text-lg truncate max-w-full">
                        {title.split(" ").slice(0, 2).join(" ")}
                    </div>

                    <div className="font-medium text-whiteSubTitle mt-1 text-md max-w-[360px] overflow-hidden text-ellipsis -webkit-box" style={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                        {body}
                    </div>
                    <div className="flex pt-5 text-sm items-center text-gray-400">
                        <Image src={Pencil} alt="arrow" width={24} height={24} className='me-1 text-customCyen opacity-50' />
                        {userName}
                    </div>
                </div>
            </div>
        </div>
    );
};

