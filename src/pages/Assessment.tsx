
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { questions, Question, DiscType } from '@/lib/disc-data';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{questionId: number; optionType: DiscType}[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const handleOptionSelect = (questionId: number, optionType: DiscType) => {
    // Add answer to selected answers
    const newAnswers = [...selectedAnswers.filter(a => a.questionId !== questionId), { questionId, optionType }];
    setSelectedAnswers(newAnswers);
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

  const handleSubmit = () => {
    // Navigate to results page with answers
    navigate('/results', { state: { answers: selectedAnswers } });
  };

  const progressPercentage = isStarted ? (currentQuestion / questions.length) * 100 : 0;
  
  if (!isStarted) {
    return (
      <div className="container max-w-3xl py-12 animate-fade-in">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">DISC Personality Assessment</CardTitle>
            <CardDescription className="text-lg">
              Discover your natural behavioral style and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This assessment consists of {questions.length} questions and will take approximately 5-10 minutes to complete.
            </p>
            <p>
              For each question, select the option that best describes you in your typical environment. 
              There are no right or wrong answers - choose the response that feels most natural to you.
            </p>
            <p>
              At the end, you'll receive your DISC profile showing your behavioral preferences across the four DISC styles:
              Dominance, Influence, Steadiness, and Conscientiousness.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={() => setIsStarted(true)}>
              Begin Assessment
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const question: Question = questions[currentQuestion];
  const isCurrentQuestionAnswered = selectedAnswers.some(a => a.questionId === question.id);
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="container max-w-3xl py-8 animate-fade-in">
      <div className="mb-8 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-sm font-medium">
            {Math.round(progressPercentage)}% complete
          </p>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{question.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers.some(a => 
              a.questionId === question.id && a.optionType === option.type
            );
            
            return (
              <div 
                key={index}
                className={`answer-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(question.id, option.type)}
              >
                <div className="flex-1">
                  <p>{option.text}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-primary bg-primary/20' : 'border-muted'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          {isLastQuestion ? (
            <Button 
              onClick={handleSubmit}
              disabled={!isCurrentQuestionAnswered || selectedAnswers.length < questions.length}
            >
              Submit
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Assessment;
