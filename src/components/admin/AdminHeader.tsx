
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trash2 } from 'lucide-react';

interface AdminHeaderProps {
  onRefresh: () => void;
  onClearResults: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onRefresh, onClearResults }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">DISC Assessment Results</h1>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Results
        </Button>
        <Button variant="destructive" onClick={onClearResults}>
          <Trash2 className="mr-2 h-4 w-4" /> Clear All Results
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
