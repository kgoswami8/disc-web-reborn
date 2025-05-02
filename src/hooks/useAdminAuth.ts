
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real app, this would validate against a backend
    // For demo purposes, use a simple password
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password.",
        variant: "destructive",
      });
    }
  };

  return {
    isAuthenticated,
    password,
    setPassword,
    handleLogin
  };
};
