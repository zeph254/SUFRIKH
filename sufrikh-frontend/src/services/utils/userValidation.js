export const validateUserData = (user) => {
    const requiredFields = ['id', 'email', 'first_name', 'last_name'];
    const defaultValues = {
      phone: '',
      gender: 'male',
      id_type: 'passport',
      id_number: '',
      prayer_in_room: false,
      no_alcohol: true,
      zabihah_only: true,
      special_requests: '',
      profile_picture: null
    };
  
    if (!user) return defaultValues;
  
    // Check required fields
    for (const field of requiredFields) {
      if (!user[field]) {
        console.error(`Missing required field: ${field}`);
        return defaultValues;
      }
    }
  
    return {
      ...defaultValues,
      ...user
    };
  };