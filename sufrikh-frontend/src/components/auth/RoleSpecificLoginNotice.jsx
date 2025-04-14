import { FaHardHat, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const RoleSpecificLoginNotice = () => {
  const { authError } = useAuth();
  
  // Show nothing if there's an error
  if (authError) return null;

  return (
    <div className="mb-6 space-y-2">
      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
        <FaHardHat className="text-blue-600 mr-2" />
        <span className="text-sm">
          <strong>Workers:</strong> Use your company email and temporary password
        </span>
      </div>
      <div className="flex items-center p-3 bg-purple-50 rounded-lg">
        <FaUserShield className="text-purple-600 mr-2" />
        <span className="text-sm">
          <strong>Admins:</strong> Use your admin credentials
        </span>
      </div>
    </div>
  );
};

export default RoleSpecificLoginNotice;