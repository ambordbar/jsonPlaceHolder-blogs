import Card from "@/app/components/productCard";
import { fetchPostsAndUsers } from "../action/post";

export default async function listPost() {

    const data = await fetchPostsAndUsers();

    return (
        <div className="mx-4 xs:mx:6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xs:gap-0 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-8 2xl:gap-10  flex justify-between items-center">
                {data.reverse().map((item, index) => (
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
