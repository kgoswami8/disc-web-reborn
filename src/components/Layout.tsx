
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col gradient-bg">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 bg-white/80">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DISC Assessment. All rights reserved.
          <div className="mt-2">
            <Link to="/admin" className="text-primary hover:underline">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
