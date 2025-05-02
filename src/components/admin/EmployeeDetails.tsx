
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessedResult } from '@/hooks/useAssessmentResults';
import { discDescriptions, DiscType, getDiscBgColor, getDiscColor } from '@/lib/disc-data';
import DiscChart from '@/components/DiscChart';
import { Calendar } from 'lucide-react';

interface EmployeeDetailsProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  employee: ProcessedResult | null;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ isOpen, setIsOpen, employee }) => {
  if (!employee) return null;

  const getTypeColor = (type: DiscType) => {
    const colors = {
      'D': 'text-orange-500',
      'I': 'text-purple-500',
      'S': 'text-green-500',
      'C': 'text-blue-500'
    };
    return colors[type];
  };

  // Generate work style insights based on DISC profile
  const generateWorkStyleInsights = () => {
    const insights = {
      D: [
        "Thrives in competitive environments where quick decisions are valued",
        "Prefers direct communication and getting straight to the point",
        "Works best when given authority and autonomy over projects",
        "May need to work on patience with slower-moving team members",
        "Can be an effective leader during times of change or crisis"
      ],
      I: [
        "Excels in collaborative, team-oriented environments",
        "Communicates enthusiastically and builds rapport easily",
        "Brings creative energy and optimism to projects",
        "May benefit from tools to help with follow-through and details",
        "Natural at motivating and persuading others"
      ],
      S: [
        "Creates harmony and stability in team environments",
        "Prefers clear instructions and consistent workflows",
        "Reliable team member who follows through on commitments",
        "May need time to adapt to sudden changes or pivots",
        "Excels at supportive roles and patient problem-solving"
      ],
      C: [
        "Thrives in environments with clear standards and processes",
        "Pays close attention to quality, accuracy, and details",
        "Works systematically through complex problems",
        "May benefit from focusing on the big picture occasionally",
        "Values expertise and is driven by correctness"
      ]
    };
    
    return insights[employee.primaryType];
  };

  const workInsights = generateWorkStyleInsights();
  const primaryInfo = discDescriptions[employee.primaryType];
  const secondaryInfo = discDescriptions[employee.secondaryType];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-xl w-full max-w-full lg:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-2xl">Employee Assessment Details</SheetTitle>
          <SheetDescription className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Completed on {employee.date}
          </SheetDescription>
        </SheetHeader>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{employee.name}</h1>
          <p className="text-muted-foreground">{employee.email}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">DISC Profile</h2>
          <p className="mb-4">
            Primary style: <span className={`font-semibold ${getDiscColor(employee.primaryType)}`}>{primaryInfo.title}</span> 
            with <span className={`font-semibold ${getDiscColor(employee.secondaryType)}`}>{secondaryInfo.title}</span> as secondary style.
          </p>
          <div className="bg-muted rounded-md p-4">
            <DiscChart profile={employee.scores} />
          </div>
        </div>

        <Tabs defaultValue="primary" className="mt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="primary">
              Primary Style
            </TabsTrigger>
            <TabsTrigger value="work">
              Work Style Insights
            </TabsTrigger>
            <TabsTrigger value="communication">
              Communication
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="primary" className="space-y-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`${getDiscBgColor(employee.primaryType)} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold`}>
                  {employee.primaryType}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{primaryInfo.title}</h3>
                  <p className="text-muted-foreground">{primaryInfo.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Strengths</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {employee.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Challenges</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {employee.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="work" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Work Environment Preferences</h3>
              <p className="mb-2">Based on their {primaryInfo.title} profile, {employee.name} likely prefers work environments that are:</p>
              <ul className="list-disc pl-5 space-y-1">
                {employee.primaryType === 'D' && (
                  <>
                    <li>Fast-paced with minimal restrictions</li>
                    <li>Results-oriented and challenging</li>
                    <li>Offering leadership opportunities</li>
                    <li>Providing autonomy and authority</li>
                  </>
                )}
                {employee.primaryType === 'I' && (
                  <>
                    <li>Socially stimulating and collaborative</li>
                    <li>Offering variety and spontaneity</li>
                    <li>Providing public recognition for achievements</li>
                    <li>Team-oriented with strong relationships</li>
                  </>
                )}
                {employee.primaryType === 'S' && (
                  <>
                    <li>Stable and predictable</li>
                    <li>Harmonious with minimal conflict</li>
                    <li>Offering clear expectations</li>
                    <li>Valuing loyalty and dedication</li>
                  </>
                )}
                {employee.primaryType === 'C' && (
                  <>
                    <li>Structured with clear procedures</li>
                    <li>Detail-oriented and precise</li>
                    <li>Allowing for independent work</li>
                    <li>Valuing expertise and competence</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Decision-Making Style</h3>
              <p>
                {employee.primaryType === 'D' && "They tend to make quick, decisive choices based on results and bottom-line impact. They're comfortable taking risks when necessary."}
                {employee.primaryType === 'I' && "They often make decisions based on intuition, relationships, and what generates enthusiasm. They prioritize creative solutions."}
                {employee.primaryType === 'S' && "They prefer to make careful, methodical decisions that maintain stability. They value input from others and consider team impact."}
                {employee.primaryType === 'C' && "They approach decisions analytically, gathering information before proceeding. They prioritize accuracy and logic when weighing options."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Working With Others</h3>
              <ul className="list-disc pl-5 space-y-1">
                {workInsights.map((insight, i) => (
                  <li key={i}>{insight}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="communication" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Communication Style</h3>
              <p>{employee.communication}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">How to Communicate with {employee.name}</h3>
              <p>When communicating with {employee.name}, it's best to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {employee.primaryType === 'D' && (
                  <>
                    <li>Be clear, specific, and to the point</li>
                    <li>Focus on results and outcomes</li>
                    <li>Provide options rather than single solutions</li>
                    <li>Be prepared to answer questions directly</li>
                    <li>Avoid unnecessary small talk or lengthy explanations</li>
                  </>
                )}
                {employee.primaryType === 'I' && (
                  <>
                    <li>Allow time for socializing and building rapport</li>
                    <li>Express enthusiasm and positivity</li>
                    <li>Focus on the big picture rather than details</li>
                    <li>Provide opportunities for them to express ideas and opinions</li>
                    <li>Use stories and examples rather than dry data</li>
                  </>
                )}
                {employee.primaryType === 'S' && (
                  <>
                    <li>Be sincere and personal in your approach</li>
                    <li>Take time to explain changes thoroughly</li>
                    <li>Show appreciation for their contributions</li>
                    <li>Provide reassurance and clear next steps</li>
                    <li>Create a warm, friendly environment for discussions</li>
                  </>
                )}
                {employee.primaryType === 'C' && (
                  <>
                    <li>Provide detailed information and be well-prepared</li>
                    <li>Present information in a logical, systematic way</li>
                    <li>Focus on accuracy and quality</li>
                    <li>Give them time to process information before asking for decisions</li>
                    <li>Support ideas with relevant data and evidence</li>
                  </>
                )}
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        <SheetFooter className="mt-8">
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeDetails;
