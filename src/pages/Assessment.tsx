
import React from 'react';
import AssessmentIntro from '@/components/assessment/AssessmentIntro';
import QuestionCard from '@/components/assessment/QuestionCard';
import ProgressIndicator from '@/components/assessment/ProgressIndicator';
import { useAssessment } from '@/hooks/useAssessment';

const Assessment = () => {
  const {
    currentQuestion,
    questions,
    isStarted,
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
  } = useAssessment();
  
  if (!isStarted) {
    return <AssessmentIntro onStart={handleStart} />;
  }

  return (
    <div className="container max-w-4xl py-8 animate-fade-in">
      <ProgressIndicator 
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        isStarted={isStarted}
      />

      <QuestionCard
        question={question}
        currentAnswer={currentAnswer}
        onMostLikelySelect={handleMostLikelySelect}
        onLeastLikelySelect={handleLeastLikelySelect}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isLastQuestion={isLastQuestion}
        isCurrentQuestionFullyAnswered={isCurrentQuestionFullyAnswered}
        allQuestionsAnswered={allQuestionsAnswered}
        currentQuestionNumber={currentQuestion}
        totalQuestions={questions.length}
      />
    </div>
  );
};

export default Assessment;
