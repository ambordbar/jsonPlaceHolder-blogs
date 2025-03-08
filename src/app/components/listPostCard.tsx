import Card from "./productCard";
import { fetchPostsAndUsers } from "../action/post";

export default async function listPost() {

    const data = await fetchPostsAndUsers();

    const lastTenPosts = data.reverse().slice(0, 12);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6 md:gap-8 lg:gap-8 xl:gap-8 2xl:gap-10 flex justify-between items-center mx-2 md:mx-0">
                {lastTenPosts.map((item, index) => (
                    <div key={index} className="">
                        <Card
                            indexCard={item.id}
                            title={item.title}
                            body={item.body}
                            userName={item.authorName}
                            className="w-64"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
