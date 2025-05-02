
import { useState, useEffect } from 'react';
import { calculateDiscProfile, DiscType, discDescriptions } from '@/lib/disc-data';
import { toast } from '@/hooks/use-toast';

// Interface for stored assessment results
export interface StoredAssessmentResult {
  answers: { questionId: number; optionType: DiscType }[];
  userInfo: { name: string; email: string };
  timestamp: string;
  rawAnswers: { questionId: number; mostLikely: DiscType | null; leastLikely: DiscType | null }[];
}

// Interface for processed assessment results to display
export interface ProcessedResult {
  id: number;
  name: string;
  email: string;
  date: string;
  primaryType: DiscType;
  secondaryType: DiscType;
  scores: { D: number; I: number; S: number; C: number };
  strengths: string[];
  challenges: string[];
  communication: string;
}

export const useAssessmentResults = (isAuthenticated: boolean) => {
  const [assessmentResults, setAssessmentResults] = useState<ProcessedResult[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<ProcessedResult | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

  // Load results from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      loadResults();
    }
  }, [isAuthenticated]);

  const loadResults = () => {
    try {
      // Get results from localStorage
      const storedResults = localStorage.getItem('disc_assessment_results');
      if (storedResults) {
        const parsedResults: StoredAssessmentResult[] = JSON.parse(storedResults);
        
        // Process the raw results into the format we need
        const processedResults: ProcessedResult[] = parsedResults.map((result, index) => {
          // Calculate DISC profile from answers
          const discResult = calculateDiscProfile(result.answers);
          
          // Format date from timestamp
          const date = new Date(result.timestamp).toLocaleDateString();
          
          // Generate random strengths, challenges based on primary type (in real app this would be derived from the assessment)
          const primaryType = discResult.primary;
          const primaryInfo = discDescriptions[primaryType];
          
          return {
            id: index + 1,
            name: result.userInfo.name,
            email: result.userInfo.email,
            date,
            primaryType: discResult.primary,
            secondaryType: discResult.secondary || 'D',
            scores: discResult.profile,
            strengths: primaryInfo.strengths,
            challenges: primaryInfo.challenges,
            communication: primaryInfo.communication
          };
        });
        
        setAssessmentResults(processedResults);
        
        // Show success toast if results loaded
        if (processedResults.length > 0) {
          toast({
            title: "Results Loaded",
            description: `Loaded ${processedResults.length} assessment results.`,
          });
        }
      }
    } catch (error) {
      console.error("Error loading results from localStorage:", error);
      toast({
        title: "Error",
        description: "Failed to load assessment results.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (employee: ProcessedResult) => {
    setSelectedEmployee(employee);
    setIsDetailSheetOpen(true);
  };

  const handleClearResults = () => {
    if (confirm("Are you sure you want to clear all assessment results? This cannot be undone.")) {
      localStorage.removeItem('disc_assessment_results');
      setAssessmentResults([]);
      toast({
        title: "Results Cleared",
        description: "All assessment results have been cleared.",
      });
    }
  };

  const filteredResults = filter === 'all' 
    ? assessmentResults 
    : assessmentResults.filter(result => result.primaryType === filter);

  return {
    filter,
    setFilter,
    assessmentResults,
    filteredResults,
    selectedEmployee,
    setSelectedEmployee,
    isDetailSheetOpen,
    setIsDetailSheetOpen,
    loadResults,
    handleViewDetails,
    handleClearResults
  };
};
