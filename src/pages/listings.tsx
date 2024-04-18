import { ImagePost } from "../components/imagepost";
import { NavBar } from "../components/navBar";
import useFetchPosts from "../hooks/usePosts";

const ListingPage = () => {
  const { posts, loading } = useFetchPosts(
    `${import.meta.env.VITE_HEADER}user/api/missing`
  );
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <ul>
        {posts.map((post: { fullName: string; _id: string; url: string }) => (
          <div className='container mx-auto p-4' key={post._id}>
            <ImagePost username={post.fullName} imageUrl={post.url} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListingPage;
