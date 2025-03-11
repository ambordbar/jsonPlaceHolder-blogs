import Card from "./productCard";
import { fetchPostsAndUsers } from "@/app/action/post";

interface ListPostCardProps {
  numberOfPosts?: number;
}

export default async function ListPostCard({
  numberOfPosts = undefined,
}: ListPostCardProps) {
  const data = await fetchPostsAndUsers();
  const lastTenPosts = data.reverse().slice(0, numberOfPosts || data.length);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex justify-between items-center mb-10 md:mx-0">
        {lastTenPosts.map((item, index) => (
          <div key={index}>
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
