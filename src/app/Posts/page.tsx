import ListPost from "@/app/components/dynamic-component/ListPostCard";

export default async function listPost() {
  return (
    <div>
      <ListPost numberOfPosts={20} />
    </div>
  );
}
