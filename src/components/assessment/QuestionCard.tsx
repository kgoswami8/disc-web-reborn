
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question, DiscType } from '@/lib/disc-data';
import QuestionOptions from './QuestionOptions';

interface QuestionCardProps {
  question: Question;
  currentAnswer: {
    questionId: number;
    mostLikely: DiscType | null;
    leastLikely: DiscType | null;
  };
  onMostLikelySelect: (questionId: number, optionType: DiscType) => void;
  onLeastLikelySelect: (questionId: number, optionType: DiscType) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
  isCurrentQuestionFullyAnswered: boolean;
  allQuestionsAnswered: boolean;
  currentQuestionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  currentAnswer,
  onMostLikelySelect,
  onLeastLikelySelect,
  onPrevious,
  onNext,
  onSubmit,
  isLastQuestion,
  isCurrentQuestionFullyAnswered,
  allQuestionsAnswered,
  currentQuestionNumber,
  totalQuestions
}: QuestionCardProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          Question {currentQuestionNumber + 1}: {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Most Likely Column */}
          <QuestionOptions 
            options={question.options}
            selectedOption={currentAnswer.mostLikely}
            onSelectOption={(optionType) => onMostLikelySelect(question.id, optionType)}
            type="most"
          />

          {/* Least Likely Column */}
          <QuestionOptions 
            options={question.options}
            selectedOption={currentAnswer.leastLikely}
            onSelectOption={(optionType) => onLeastLikelySelect(question.id, optionType)}
            type="least"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionNumber === 0}
        >
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button 
            onClick={onSubmit}
            disabled={!allQuestionsAnswered}
          >
            Submit Assessment
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            disabled={!isCurrentQuestionFullyAnswered}
          >
            Next Question
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
