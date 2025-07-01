import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Image uploaded successfully!');
    } catch (error) {
      setMessage('Upload failed. Try again.');
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Profile Image</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded" />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default UploadImage;
