// utils/validateAuth.js
export const validateAuthResponse = (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response format');
    }
    
    if (!data.token) {
      throw new Error('No authentication token received');
    }
    
    return {
      token: data.token,
      user: data.user || null
    };
  };
  
  // Then in your auth service:
  import { validateAuthResponse } from './utils/validateAuth';
  
  const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return validateAuthResponse(response.data);
  };