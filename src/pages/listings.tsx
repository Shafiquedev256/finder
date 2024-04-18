import { ImagePost } from "../components/imagepost";
import { NavBar } from "../components/navBar";
import useFetchPosts from "../hooks/usePosts";

export type Post = {
  fullName: string;
  age: string;
  gender: string;
  lastSeenLocation: string;
  dateLastSeen: string;
  description: string;
  contactName: string;
  contactNumber: string;
  url: string;
  _id: string;
};
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
      <div className='font-bold text-center text-3xl md:text-5xl '>
        List of missing people .
      </div>
      <div className='md:grid md:grid-cols-3'>
        {posts.map((post: Post) => (
          <div className='container mx-auto p-4' key={post._id}>
            <ImagePost post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
