
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiscType, questions } from '@/lib/disc-data';
import { toast } from '@/hooks/use-toast';

interface Answer {
  questionId: number;
  mostLikely: DiscType | null;
  leastLikely: DiscType | null;
}

interface UserInfo {
  name: string;
  email: string;
}

export function useAssessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '' });

  const handleMostLikelySelect = (questionId: number, optionType: DiscType) => {
    const existingAnswer = selectedAnswers.find(a => a.questionId === questionId);
    if (existingAnswer) {
      setSelectedAnswers(selectedAnswers.map(a => 
        a.questionId === questionId ? { ...a, mostLikely: optionType } : a
      ));
    } else {
      setSelectedAnswers([...selectedAnswers, { questionId, mostLikely: optionType, leastLikely: null }]);
    }
  };

  const handleLeastLikelySelect = (questionId: number, optionType: DiscType) => {
    const existingAnswer = selectedAnswers.find(a => a.questionId === questionId);
    if (existingAnswer) {
      setSelectedAnswers(selectedAnswers.map(a => 
        a.questionId === questionId ? { ...a, leastLikely: optionType } : a
      ));
    } else {
      setSelectedAnswers([...selectedAnswers, { questionId, mostLikely: null, leastLikely: optionType }]);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStart = (name: string, email: string) => {
    setUserInfo({ name, email });
    setIsStarted(true);
  };

  const handleSubmit = () => {
    // Transform answers for result calculation and include user info
    const transformedAnswers = selectedAnswers.map(answer => ({
      questionId: answer.questionId,
      optionType: answer.mostLikely || 'D'  // Default to 'D' if somehow null
    }));

    // Add timestamp to the results
    const timestamp = new Date().toISOString();
    
    // Create full results object
    const fullResults = {
      answers: transformedAnswers,
      userInfo,
      timestamp,
      rawAnswers: selectedAnswers
    };
    
    // Save to localStorage
    try {
      // Get existing results or initialize empty array
      const existingResults = JSON.parse(localStorage.getItem('disc_assessment_results') || '[]');
      
      // Add new result
      existingResults.push(fullResults);
      
      // Save back to localStorage
      localStorage.setItem('disc_assessment_results', JSON.stringify(existingResults));
      
      // Show success toast
      toast({
        title: "Assessment Completed",
        description: "Your results have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving results to localStorage:", error);
    }

    // Navigate to results page with answers, user info and timestamp
    navigate('/results', { 
      state: { 
        answers: transformedAnswers,
        userInfo,
        timestamp
      } 
    });
  };

  const question = questions[currentQuestion];
  const currentAnswer = selectedAnswers.find(a => a.questionId === question?.id) || { 
    questionId: question?.id || 0, 
    mostLikely: null, 
    leastLikely: null 
  };
  const isCurrentQuestionFullyAnswered = currentAnswer.mostLikely !== null && currentAnswer.leastLikely !== null;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allQuestionsAnswered = questions.length === selectedAnswers.filter(a => a.mostLikely !== null && a.leastLikely !== null).length;

  return {
    currentQuestion,
    questions,
    selectedAnswers,
    isStarted,
    userInfo,
    question,
    currentAnswer,
    isCurrentQuestionFullyAnswered,
    isLastQuestion,
    allQuestionsAnswered,
    handleMostLikelySelect,
    handleLeastLikelySelect,
    handleNext,
    handlePrevious,
    handleStart,
    handleSubmit
  };
}
