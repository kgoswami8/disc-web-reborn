
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AssessmentIntroProps {
  onStart: (name: string, email: string) => void;
}

const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [consentGiven, setConsentGiven] = useState(false);
  const [formErrors, setFormErrors] = useState({ name: false, email: false, consent: false });

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
      onStart(userInfo.name, userInfo.email);
    }
  };

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
            This assessment consists of multiple questions and will take approximately 5-10 minutes to complete.
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
};

export default AssessmentIntro;
