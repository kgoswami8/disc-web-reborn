
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateDiscProfile, discDescriptions, getDiscBgColor, getDiscColor, DiscResult } from '@/lib/disc-data';
import DiscChart from '@/components/DiscChart';

const Results = () => {
  const location = useLocation();
  const [result, setResult] = useState<DiscResult | null>(null);

  useEffect(() => {
    if (location.state?.answers) {
      const answers = location.state.answers;
      const discResult = calculateDiscProfile(answers);
      setResult(discResult);
    }
  }, [location.state]);

  if (!result) {
    return (
      <div className="container py-12 text-center animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">No Results Available</h1>
        <p className="mb-6">You need to complete the assessment to view your results.</p>
        <Link to="/assessment">
          <Button>Take the Assessment</Button>
        </Link>
      </div>
    );
  }

  const { primary, secondary, profile, description } = result;
  const primaryInfo = discDescriptions[primary];
  const secondaryInfo = secondary ? discDescriptions[secondary] : null;

  return (
    <div className="container py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Your DISC Results</h1>
          <p className="text-xl text-muted-foreground">
            Your primary style is <span className={`font-semibold ${getDiscColor(primary)}`}>{primaryInfo.title}</span>
            {secondary && (
              <> with <span className={`font-semibold ${getDiscColor(secondary)}`}>{secondaryInfo?.title}</span> as secondary style</>
            )}.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Profile Overview</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <DiscChart profile={profile} />
          </CardContent>
        </Card>

        <Tabs defaultValue="primary">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="primary">
              Primary Style: {primaryInfo.title}
            </TabsTrigger>
            <TabsTrigger value="combination" disabled={!secondary}>
              Style Combination
            </TabsTrigger>
          </TabsList>
          <TabsContent value="primary">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`${getDiscBgColor(primary)} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold`}>
                    {primary}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{primaryInfo.title}</CardTitle>
                    <CardDescription className="text-md">{primaryInfo.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Strengths</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {primaryInfo.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Potential Challenges</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {primaryInfo.challenges.map((challenge, i) => (
                      <li key={i}>{challenge}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Communication Tips</h3>
                  <p>{primaryInfo.communication}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="combination">
            {secondary && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`${getDiscBgColor(primary)} text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold`}>
                      {primary}
                    </div>
                    <div className={`${getDiscBgColor(secondary)} text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold`}>
                      {secondary}
                    </div>
                    <CardTitle className="text-2xl">{primaryInfo.title} with {secondaryInfo?.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    With {primary} as your primary style and {secondary} as your secondary style, you combine elements of both in your approach.
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Your Unique Combination</h3>
                    <p className="mb-4">
                      {primary === 'D' && secondary === 'I' && "You are results-driven but also persuasive and personable. You can be both direct and charismatic when pursuing goals."}
                      {primary === 'D' && secondary === 'S' && "You balance drive for results with patience and reliability. You can be decisive while still considering stability."}
                      {primary === 'D' && secondary === 'C' && "You combine assertiveness with analytical thinking. You push for results but are careful about quality and accuracy."}
                      
                      {primary === 'I' && secondary === 'D' && "You are primarily social and expressive, but also have a results-focused edge. You can inspire others while still driving toward goals."}
                      {primary === 'I' && secondary === 'S' && "You combine enthusiasm with patience. You're people-oriented but also value stability and reliability in relationships."}
                      {primary === 'I' && secondary === 'C' && "You balance sociability with attention to detail. You can be both engaging and precise in your interactions."}
                      
                      {primary === 'S' && secondary === 'D' && "You are primarily steady and supportive, but can be assertive when needed. You value stability but can take action when required."}
                      {primary === 'S' && secondary === 'I' && "You are supportive with an outgoing side. You value relationships and can be both patient and expressive."}
                      {primary === 'S' && secondary === 'C' && "You combine patience with precision. You're reliable and also attentive to quality and details."}
                      
                      {primary === 'C' && secondary === 'D' && "You are detail-oriented with a decisive edge. You value accuracy but can also push for results when needed."}
                      {primary === 'C' && secondary === 'I' && "You combine analytical thinking with interpersonal skills. You're precise but can also connect with others."}
                      {primary === 'C' && secondary === 'S' && "You value both accuracy and stability. You are methodical, detail-oriented, and patient in your approach."}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Leveraging Your Combination</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Focus on using your {primaryInfo.title.toLowerCase()} skills as your primary approach</li>
                      <li>Draw on your {secondaryInfo?.title.toLowerCase()} qualities when the situation calls for them</li>
                      <li>Be aware that you may shift between styles depending on the context</li>
                      <li>Your versatility across these two styles is a strength you can leverage</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-8 space-x-4">
          <Link to="/">
            <Button variant="outline">Return Home</Button>
          </Link>
          <Link to="/assessment">
            <Button>Retake Assessment</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
