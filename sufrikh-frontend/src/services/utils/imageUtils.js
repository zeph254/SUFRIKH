// src/utils/imageUtils.js

export const getProfilePictureUrl = (profilePicture) => {
    if (!profilePicture) return getDefaultProfilePictureUrl();
    
    // If already a full URL (from Cloudinary)
    if (profilePicture.startsWith('http')) {
      return profilePicture;
    }
    
    // If relative path from your API
    return `${import.meta.env.VITE_API_URL}${profilePicture}`;
  };
  
  export const getDefaultProfilePictureUrl = () => {
    // Use a simple SVG as fallback
    return 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23cccccc\'%3E%3Cpath d=\'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z\'/%3E%3Cpath d=\'M12 5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 7c-2.209 0-4 1.343-4 3h8c0-1.657-1.791-3-4-3z\'/%3E%3C/svg%3E';
  };