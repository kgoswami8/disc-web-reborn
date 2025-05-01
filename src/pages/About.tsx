
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDiscBgColor, getDiscColor } from '@/lib/disc-data';

const About = () => {
  return (
    <div className="container py-12 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-center">About the DISC Assessment</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg mb-4">
          The DISC assessment is a behavior assessment tool based on the DISC theory of psychologist William Marston. 
          It centers on four different personality traits: Dominance, Influence, Steadiness, and Conscientiousness.
        </p>
        <p className="text-lg mb-4">
          The assessment helps individuals understand their behavioral preferences and how they might interact with others.
          It's widely used for improving teamwork, communication, and personal development in professional and personal contexts.
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>The Four DISC Styles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {[
                {
                  type: 'D',
                  title: 'Dominance',
                  traits: ['Direct', 'Results-oriented', 'Firm', 'Strong-willed', 'Forceful'],
                  description: 'People high in Dominance tend to be direct, assertive, and focus on accomplishing results. They enjoy challenges, taking action, and immediate results.'
                },
                {
                  type: 'I',
                  title: 'Influence',
                  traits: ['Outgoing', 'Enthusiastic', 'Optimistic', 'Persuasive', 'Talkative'],
                  description: 'People high in Influence tend to be outgoing, enthusiastic, and focus on building relationships. They enjoy social recognition, group activities, and are persuasive communicators.'
                },
                {
                  type: 'S',
                  title: 'Steadiness',
                  traits: ['Patient', 'Reliable', 'Stable', 'Calm', 'Good listener'],
                  description: 'People high in Steadiness tend to be patient, supportive, and focus on cooperation. They enjoy stability, sincere appreciation, and developing specialized skills.'
                },
                {
                  type: 'C',
                  title: 'Conscientiousness',
                  traits: ['Analytical', 'Precise', 'Systematic', 'Logical', 'Detail-oriented'],
                  description: 'People high in Conscientiousness tend to be analytical, systematic, and focus on ensuring accuracy and quality. They enjoy independence, detailed explanations, and the opportunity to demonstrate their expertise.'
                },
              ].map((style) => (
                <div key={style.type} className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`${getDiscBgColor(style.type as any)} text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold`}>
                      {style.type}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${getDiscColor(style.type as any)}`}>{style.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {style.traits.map((trait, i) => (
                        <span key={i} className="bg-muted px-2 py-1 rounded text-sm">
                          {trait}
                        </span>
                      ))}
                    </div>
                    <p>{style.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>The History of DISC</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The DISC theory was first developed by William Moulton Marston in the 1920s. As a psychologist, Marston was interested in the emotions of normal people, which led him to develop the DISC theory as outlined in his 1928 book "Emotions of Normal People."
              </p>
              <p>
                Marston theorized that the behavioral expression of emotions could be categorized into four primary types:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dominance</strong> – Producing direct results, taking action, facing challenges
                </li>
                <li>
                  <strong>Inducement (now Influence)</strong> – Influencing others, openness, relationships
                </li>
                <li>
                  <strong>Submission (now Steadiness)</strong> – Cooperation, sincerity, dependability
                </li>
                <li>
                  <strong>Compliance (now Conscientiousness)</strong> – Quality, accuracy, expertise, competency
                </li>
              </ul>
              <p>
                While Marston developed the theory, he did not create an assessment tool. Various companies and researchers later developed assessments based on his model, which have evolved into the modern DISC assessments used worldwide today.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Applications of DISC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Team Building</h3>
                  <p>
                    DISC helps team members understand each other's communication preferences and work styles, leading to improved collaboration and reduced conflict.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Leadership Development</h3>
                  <p>
                    Leaders can use DISC insights to adapt their management style to different team members and situations, improving their effectiveness.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Sales and Customer Service</h3>
                  <p>
                    Understanding customer DISC styles helps sales professionals tailor their approach to different customer preferences and communication styles.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Personal Development</h3>
                  <p>
                    Individuals can gain self-awareness about their natural tendencies and learn strategies to adapt in different situations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Conflict Resolution</h3>
                  <p>
                    DISC provides a neutral language to discuss different approaches and perspectives, helping resolve conflicts constructively.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Hiring and Selection</h3>
                  <p>
                    DISC can be used as one component of a comprehensive hiring process to assess job fit and team compatibility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle>Research and Validity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                While DISC is widely used and provides valuable insights for personal and professional development, it's important to understand its place in the spectrum of psychological assessments.
              </p>
              <p>
                DISC is primarily a behavioral model rather than a comprehensive personality assessment. It measures how people behave and prefer to communicate in their current environment, not underlying motivations or aptitudes.
              </p>
              <p>
                Key points about DISC reliability and validity:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Test-Retest Reliability:</strong> Most validated DISC assessments show good test-retest reliability, meaning results remain consistent over time.
                </li>
                <li>
                  <strong>Face Validity:</strong> DISC typically has strong face validity, with people reporting that their results accurately reflect how they see themselves.
                </li>
                <li>
                  <strong>Construct Validity:</strong> DISC measures observable behaviors rather than underlying psychological constructs.
                </li>
                <li>
                  <strong>Not a Clinical Tool:</strong> DISC is not designed for clinical diagnosis or to identify psychological disorders.
                </li>
              </ul>
              <p>
                When using DISC, it's important to remember that people are complex and multifaceted. DISC provides one lens through which to understand behavior, but should be used alongside other tools and approaches for a complete picture.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-12">
        <Link to="/assessment">
          <Button size="lg">
            Take the Assessment Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
