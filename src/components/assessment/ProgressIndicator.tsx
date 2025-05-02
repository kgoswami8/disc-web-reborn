
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  isStarted: boolean;
}

const ProgressIndicator = ({ 
  currentQuestion, 
  totalQuestions, 
  isStarted 
}: ProgressIndicatorProps) => {
  const progressPercentage = isStarted ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;
  
  return (
    <div className="mb-8 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        <p className="text-sm font-medium">
          {Math.round(progressPercentage)}% complete
        </p>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default ProgressIndicator;
