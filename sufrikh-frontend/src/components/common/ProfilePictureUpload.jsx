import { useState } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const ProfilePictureUpload = () => {
  const { user, updateProfilePicture } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      await updateProfilePicture(file);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative mb-4">
      <img 
        src={user.profile_picture || "https://via.placeholder.com/150"} 
        alt={user.first_name} 
        className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
      />
      <label 
        htmlFor="profile-upload"
        className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700"
      >
        {isUploading ? (
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <FaCamera />
        )}
      </label>
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
};

export default ProfilePictureUpload;