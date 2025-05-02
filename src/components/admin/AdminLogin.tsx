
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminLoginProps {
  password: string;
  setPassword: (password: string) => void;
  handleLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ 
  password, 
  setPassword, 
  handleLogin 
}) => {
  return (
    <div className="container max-w-md py-12 animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your password to view assessment results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
            />
            <p className="text-xs text-muted-foreground">For demo purposes, use: admin123</p>
          </div>
          <Button className="w-full" onClick={handleLogin}>Login</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
