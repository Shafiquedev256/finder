import { Post } from "../pages/listings";

type ImagePostProps = {
  post: Partial<Post>;
};

export const ImagePost = ({ post }: ImagePostProps) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-md relative'>
      <div className='text-sm z-10 font-bold text-red-600 bg-red-100 absolute rounded text-center  top-0 m-1 right-0 w-fit p-1'>
        Missing
      </div>
      <img src={post.url} alt='Posted' className='w-full' />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{post.fullName}</div>
        <div className='flex flex-row space-x-3'>
          <span className='font-medium '>Gender:</span>
          <span className='text-gray-700'>{post.gender}</span>
        </div>
        <div className='flex flex-row space-x-3'>
          <span className='font-medium '>Age:</span>
          <span className='text-gray-700'>{post.age}</span>
        </div>
        <div className='flex flex-row space-x-3'>
          <span className='font-medium '>Last seen in :</span>
          <span className='text-gray-700'>{post.lastSeenLocation}</span>
        </div>
        <div className='flex flex-row space-x-3'>
          <span className='font-medium '>Posted by:</span>
          <span className='text-gray-700'>{post.contactName}</span>
        </div>
      </div>
    </div>
  );
};
