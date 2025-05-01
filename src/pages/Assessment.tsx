
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { questions, Question, DiscType } from '@/lib/disc-data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    questionId: number;
    mostLikely: DiscType | null;
    leastLikely: DiscType | null;
  }[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [consentGiven, setConsentGiven] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: false, email: false, consent: false });

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

  const handleStart = () => {
    const nameError = !userInfo.name.trim();
    const emailError = !userInfo.email.trim() || !userInfo.email.includes('@');
    const consentError = !consentGiven;
    
    setFormErrors({
      name: nameError,
      email: emailError,
      consent: consentError
    });

    if (!nameError && !emailError && !consentError) {
      setIsStarted(true);
    }
  };

  const handleSubmit = () => {
    // Transform answers for result calculation and include user info
    const transformedAnswers = selectedAnswers.map(answer => ({
      questionId: answer.questionId,
      optionType: answer.mostLikely || 'D'  // Default to 'D' if somehow null
    }));

    // Add timestamp to the results
    const timestamp = new Date().toISOString();

    // Navigate to results page with answers, user info and timestamp
    navigate('/results', { 
      state: { 
        answers: transformedAnswers,
        userInfo,
        timestamp
      } 
    });
  };

  const progressPercentage = isStarted ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  
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
          <CardContent className="space-y-6">
            <p>
              This assessment consists of {questions.length} questions and will take approximately 5-10 minutes to complete.
            </p>
            <p>
              For each question, select the option that best describes you in your typical environment. 
              There are no right or wrong answers - choose the response that feels most natural to you.
            </p>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your full name" 
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className={formErrors.name ? "border-destructive" : ""}
                />
                {formErrors.name && <p className="text-sm text-destructive">Please enter your name</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  className={formErrors.email ? "border-destructive" : ""}
                />
                {formErrors.email && <p className="text-sm text-destructive">Please enter a valid email address</p>}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="consent" 
                  checked={consentGiven}
                  onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                />
                <label 
                  htmlFor="consent" 
                  className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${formErrors.consent ? "text-destructive" : ""}`}
                >
                  I consent to my assessment results being stored and analyzed
                </label>
              </div>
              {formErrors.consent && <p className="text-sm text-destructive">You must provide consent to proceed</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={handleStart}>
              Begin Assessment
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const question: Question = questions[currentQuestion];
  const currentAnswer = selectedAnswers.find(a => a.questionId === question.id) || { questionId: question.id, mostLikely: null, leastLikely: null };
  const isCurrentQuestionFullyAnswered = currentAnswer.mostLikely !== null && currentAnswer.leastLikely !== null;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allQuestionsAnswered = questions.length === selectedAnswers.filter(a => a.mostLikely !== null && a.leastLikely !== null).length;

  return (
    <div className="container max-w-4xl py-8 animate-fade-in">
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
          <CardTitle className="text-2xl">Question {currentQuestion + 1}: {question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Most Likely Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary border-b pb-2">I am MOST likely to:</h3>
              <RadioGroup 
                value={currentAnswer.mostLikely || ""}
                onValueChange={(value) => handleMostLikelySelect(question.id, value as DiscType)}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <label 
                    key={`most-${index}`} 
                    className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent cursor-pointer"
                    onClick={() => handleMostLikelySelect(question.id, option.type)}
                  >
                    <RadioGroupItem value={option.type} id={`q${question.id}-most-${index}`} />
                    <span className="flex-1">{option.text}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Least Likely Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-primary border-b pb-2">I am LEAST likely to:</h3>
              <RadioGroup 
                value={currentAnswer.leastLikely || ""}
                onValueChange={(value) => handleLeastLikelySelect(question.id, value as DiscType)}
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <label 
                    key={`least-${index}`} 
                    className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent cursor-pointer"
                    onClick={() => handleLeastLikelySelect(question.id, option.type)}
                  >
                    <RadioGroupItem value={option.type} id={`q${question.id}-least-${index}`} />
                    <span className="flex-1">{option.text}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-6">
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
              disabled={!allQuestionsAnswered}
            >
              Submit Assessment
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={!isCurrentQuestionFullyAnswered}
            >
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Assessment;
