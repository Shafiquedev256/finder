type ImagePostProps = {
  username: string;
  imageUrl: string;
};

export const ImagePost = ({ username, imageUrl }: ImagePostProps) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img src={imageUrl} alt='Posted' className='w-full' />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{username}</div>
        <div className='flex items-center mb-2'>
          <svg
            className='w-6 h-6 mr-1 fill-current text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
          </svg>
        </div>
      </div>
    </div>
  );
};
