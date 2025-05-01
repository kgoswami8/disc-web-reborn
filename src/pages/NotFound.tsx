
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container flex flex-col items-center justify-center max-w-md py-20 text-center">
      <h1 className="text-5xl font-bold text-primary mb-6">404</h1>
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <span className="text-3xl">🔍</span>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      <Link to="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
