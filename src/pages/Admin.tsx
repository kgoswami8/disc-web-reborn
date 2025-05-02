
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAssessmentResults } from '@/hooks/useAssessmentResults';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminHeader from '@/components/admin/AdminHeader';
import ResultsFilter from '@/components/admin/ResultsFilter';
import ResultsTable from '@/components/admin/ResultsTable';
import EmployeeDetails from '@/components/admin/EmployeeDetails';

const Admin = () => {
  const { isAuthenticated, password, setPassword, handleLogin } = useAdminAuth();
  const { 
    filter,
    setFilter,
    filteredResults,
    selectedEmployee,
    isDetailSheetOpen,
    setIsDetailSheetOpen,
    loadResults,
    handleViewDetails,
    handleClearResults
  } = useAssessmentResults(isAuthenticated);

  if (!isAuthenticated) {
    return <AdminLogin 
      password={password} 
      setPassword={setPassword}
      handleLogin={handleLogin} 
    />;
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <AdminHeader 
          onRefresh={loadResults}
          onClearResults={handleClearResults}
        />
        
        <ResultsFilter 
          filter={filter}
          setFilter={setFilter}
        />
        
        <Card>
          <CardContent className="p-0">
            <ResultsTable 
              results={filteredResults}
              onViewDetails={handleViewDetails}
            />
          </CardContent>
        </Card>
        
        <p className="text-sm text-muted-foreground mt-4">
          Note: Results are currently stored in your browser's localStorage. In a production environment,
          this data would be stored in a database and retrieved through a secure API.
        </p>
      </div>

      <EmployeeDetails 
        isOpen={isDetailSheetOpen}
        setIsOpen={setIsDetailSheetOpen}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default Admin;
