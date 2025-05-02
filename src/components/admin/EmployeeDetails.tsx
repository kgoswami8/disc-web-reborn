
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ProcessedResult } from '@/hooks/useAssessmentResults';
import { discDescriptions, DiscType } from '@/lib/disc-data';

interface EmployeeDetailsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  employee: ProcessedResult | null;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ isOpen, setIsOpen, employee }) => {
  if (!employee) return null;

  const getTypeColor = (type: DiscType) => {
    const colors = {
      'D': 'text-orange-500',
      'I': 'text-purple-500',
      'S': 'text-green-500',
      'C': 'text-blue-500'
    };
    return colors[type];
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl">Employee Assessment Details</SheetTitle>
          <SheetDescription>
            Full DISC assessment results for {employee.name}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{employee.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assessment Date</p>
                <p className="font-medium">{employee.date}</p>
              </div>
            </div>
          </div>

          {/* DISC Profile */}
          <div>
            <h3 className="text-lg font-medium mb-2">DISC Profile</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center p-2 rounded-md bg-orange-100">
                <p className="font-semibold text-orange-500">D</p>
                <p className="text-2xl font-bold">{employee.scores.D}%</p>
              </div>
              <div className="text-center p-2 rounded-md bg-purple-100">
                <p className="font-semibold text-purple-500">I</p>
                <p className="text-2xl font-bold">{employee.scores.I}%</p>
              </div>
              <div className="text-center p-2 rounded-md bg-green-100">
                <p className="font-semibold text-green-500">S</p>
                <p className="text-2xl font-bold">{employee.scores.S}%</p>
              </div>
              <div className="text-center p-2 rounded-md bg-blue-100">
                <p className="font-semibold text-blue-500">C</p>
                <p className="text-2xl font-bold">{employee.scores.C}%</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Primary Style</p>
                <p className={`font-bold ${getTypeColor(employee.primaryType)}`}>
                  {employee.primaryType} - {discDescriptions[employee.primaryType].title}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Secondary Style</p>
                <p className={`font-bold ${getTypeColor(employee.secondaryType)}`}>
                  {employee.secondaryType} - {discDescriptions[employee.secondaryType].title}
                </p>
              </div>
            </div>
          </div>

          {/* Strengths & Challenges */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1">
                {employee.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Challenges</h3>
              <ul className="list-disc pl-5 space-y-1">
                {employee.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Communication Style */}
          <div>
            <h3 className="text-lg font-medium mb-2">Communication Style</h3>
            <p>{employee.communication}</p>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <p>When communicating with {employee.name}, it's best to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{discDescriptions[employee.primaryType].communication}</li>
            </ul>
          </div>
        </div>

        <SheetFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeDetails;
