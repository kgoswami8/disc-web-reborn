
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="font-bold text-white">D</span>
            </div>
            <span className="text-xl font-bold">DISC Assessment</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button 
              variant={location.pathname === '/' ? "default" : "ghost"}
              className="text-sm"
            >
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button 
              variant={location.pathname === '/about' ? "default" : "ghost"}
              className="text-sm"
            >
              About DISC
            </Button>
          </Link>
          <Link to="/assessment">
            <Button 
              variant={location.pathname.includes('/assessment') ? "default" : "secondary"}
              className="text-sm"
            >
              Take the Test
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
