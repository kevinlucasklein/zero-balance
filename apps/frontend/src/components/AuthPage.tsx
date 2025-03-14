import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleForm = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        {isLoginView ? (
          <Login onToggleForm={toggleForm} />
        ) : (
          <Signup onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthPage; 