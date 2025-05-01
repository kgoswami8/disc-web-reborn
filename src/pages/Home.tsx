
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getDiscBgColor } from '@/lib/disc-data';

const Home = () => {
  return (
    <div className="container py-12 max-w-6xl mx-auto animate-fade-in">
      <section className="py-12 md:py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Discover Your <span className="text-primary">DISC</span> Personality Style
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-muted-foreground">
          Understand your behavioral preferences, improve communication, and build better relationships.
        </p>
        <Link to="/assessment">
          <Button size="lg" className="text-lg px-8">
            Start Your Assessment
          </Button>
        </Link>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">The Four DISC Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              type: 'D',
              title: 'Dominance',
              description: 'Direct, decisive, problem-solver, risk-taker',
              characteristics: ['Results-oriented', 'Bold', 'Assertive', 'Direct']
            },
            {
              type: 'I',
              title: 'Influence',
              description: 'Interactive, influencing, engaging, optimistic',
              characteristics: ['Enthusiastic', 'Persuasive', 'Collaborative', 'Inspiring']
            },
            {
              type: 'S',
              title: 'Steadiness',
              description: 'Supportive, stable, security-oriented, patient',
              characteristics: ['Reliable', 'Team player', 'Thoughtful', 'Calm']
            },
            {
              type: 'C',
              title: 'Conscientiousness',
              description: 'Concerned, careful, correct, competent',
              characteristics: ['Analytical', 'Detail-oriented', 'Systematic', 'Precise']
            }
          ].map(style => (
            <Card key={style.type} className="disc-card overflow-hidden">
              <div className={`absolute top-0 left-0 w-1.5 h-full ${getDiscBgColor(style.type as any)}`} />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className={`${getDiscBgColor(style.type as any)} text-white w-8 h-8 flex items-center justify-center rounded-full font-bold`}>
                    {style.type}
                  </span>
                  {style.title}
                </CardTitle>
                <CardDescription className="text-base">{style.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {style.characteristics.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Take the DISC Assessment?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card className="disc-card">
            <CardHeader>
              <CardTitle>Self-Awareness</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Understand your natural tendencies, strengths, and potential blind spots.</p>
            </CardContent>
          </Card>
          <Card className="disc-card">
            <CardHeader>
              <CardTitle>Better Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Learn how to adapt your communication to connect more effectively with others.</p>
            </CardContent>
          </Card>
          <Card className="disc-card">
            <CardHeader>
              <CardTitle>Team Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Recognize the value of different styles and leverage diversity in your teams.</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <Link to="/assessment">
            <Button size="lg">
              Take the Assessment Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
