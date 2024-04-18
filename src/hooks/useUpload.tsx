import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export const useUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "finder_posts ");
    formData.append("api_key", import.meta.env.VITE_cloudinary);

    axios
      .post("https://api.cloudinary.com/v1_1/finders/image/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        setUploadedImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error uploading image to Cloudinary:", error);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const upload = () => {
    return (
      <div>
        <div
          {...getRootProps()}
          className='border-2 border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer'
        >
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
        {uploadedImage && (
          <div>
            <p>Uploaded Image:</p>
            <img src={uploadedImage} alt='Uploaded' className='max-w-full' />
          </div>
        )}
      </div>
    );
  };
  return { upload, uploadedImage };
};
