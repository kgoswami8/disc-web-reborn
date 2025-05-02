
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { discDescriptions, DiscType, calculateDiscProfile } from '@/lib/disc-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

// Interface for stored assessment results
interface StoredAssessmentResult {
  answers: { questionId: number; optionType: DiscType }[];
  userInfo: { name: string; email: string };
  timestamp: string;
  rawAnswers: { questionId: number; mostLikely: DiscType | null; leastLikely: DiscType | null }[];
}

// Interface for processed assessment results to display
interface ProcessedResult {
  id: number;
  name: string;
  email: string;
  date: string;
  primaryType: DiscType;
  secondaryType: DiscType;
  scores: { D: number; I: number; S: number; C: number };
  strengths: string[];
  challenges: string[];
  communication: string;
}

const Admin = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<ProcessedResult | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<ProcessedResult[]>([]);

  // Load results from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      loadResults();
    }
  }, [isAuthenticated]);

  const loadResults = () => {
    try {
      // Get results from localStorage
      const storedResults = localStorage.getItem('disc_assessment_results');
      if (storedResults) {
        const parsedResults: StoredAssessmentResult[] = JSON.parse(storedResults);
        
        // Process the raw results into the format we need
        const processedResults: ProcessedResult[] = parsedResults.map((result, index) => {
          // Calculate DISC profile from answers
          const discResult = calculateDiscProfile(result.answers);
          
          // Format date from timestamp
          const date = new Date(result.timestamp).toLocaleDateString();
          
          // Generate random strengths, challenges based on primary type (in real app this would be derived from the assessment)
          const primaryType = discResult.primary;
          const primaryInfo = discDescriptions[primaryType];
          
          return {
            id: index + 1,
            name: result.userInfo.name,
            email: result.userInfo.email,
            date,
            primaryType: discResult.primary,
            secondaryType: discResult.secondary || 'D',
            scores: discResult.profile,
            strengths: primaryInfo.strengths,
            challenges: primaryInfo.challenges,
            communication: primaryInfo.communication
          };
        });
        
        setAssessmentResults(processedResults);
        
        // Show success toast if results loaded
        if (processedResults.length > 0) {
          toast({
            title: "Results Loaded",
            description: `Loaded ${processedResults.length} assessment results.`,
          });
        }
      }
    } catch (error) {
      console.error("Error loading results from localStorage:", error);
      toast({
        title: "Error",
        description: "Failed to load assessment results.",
        variant: "destructive",
      });
    }
  };

  const handleLogin = () => {
    // In a real app, this would validate against a backend
    // For demo purposes, use a simple password
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Authentication Failed",
        description: "Incorrect password.",
        variant: "destructive",
      });
    }
  };

  const filteredResults = filter === 'all' 
    ? assessmentResults 
    : assessmentResults.filter(result => result.primaryType === filter);

  const getTypeColor = (type: DiscType) => {
    const colors = {
      'D': 'text-orange-500',
      'I': 'text-purple-500',
      'S': 'text-green-500',
      'C': 'text-blue-500'
    };
    return colors[type];
  };

  const handleViewDetails = (employee: ProcessedResult) => {
    setSelectedEmployee(employee);
    setIsDetailSheetOpen(true);
  };

  const handleClearResults = () => {
    if (confirm("Are you sure you want to clear all assessment results? This cannot be undone.")) {
      localStorage.removeItem('disc_assessment_results');
      setAssessmentResults([]);
      toast({
        title: "Results Cleared",
        description: "All assessment results have been cleared.",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container max-w-md py-12 animate-fade-in">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your password to view assessment results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
              <p className="text-xs text-muted-foreground">For demo purposes, use: admin123</p>
            </div>
            <Button className="w-full" onClick={handleLogin}>Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">DISC Assessment Results</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadResults}>Refresh Results</Button>
            <Button variant="destructive" onClick={handleClearResults}>Clear All Results</Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Filter by Primary Type</h2>
          <RadioGroup className="flex space-x-4" value={filter} onValueChange={setFilter}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Results</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="D" id="d-type" />
              <Label htmlFor="d-type" className="text-orange-500 font-medium">Dominance (D)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="I" id="i-type" />
              <Label htmlFor="i-type" className="text-purple-500 font-medium">Influence (I)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="S" id="s-type" />
              <Label htmlFor="s-type" className="text-green-500 font-medium">Steadiness (S)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="C" id="c-type" />
              <Label htmlFor="c-type" className="text-blue-500 font-medium">Conscientiousness (C)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableCaption>Assessment results as of {new Date().toLocaleDateString()}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Primary Type</TableHead>
                  <TableHead>Secondary Type</TableHead>
                  <TableHead>D</TableHead>
                  <TableHead>I</TableHead>
                  <TableHead>S</TableHead>
                  <TableHead>C</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-6">
                      No assessment results found. Once users complete assessments, their results will appear here.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.name}</TableCell>
                      <TableCell>{result.email}</TableCell>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getTypeColor(result.primaryType)}`}>
                          {result.primaryType} - {discDescriptions[result.primaryType].title}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${getTypeColor(result.secondaryType)}`}>
                          {result.secondaryType} - {discDescriptions[result.secondaryType].title}
                        </span>
                      </TableCell>
                      <TableCell>{result.scores.D}%</TableCell>
                      <TableCell>{result.scores.I}%</TableCell>
                      <TableCell>{result.scores.S}%</TableCell>
                      <TableCell>{result.scores.C}%</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(result)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <p className="text-sm text-muted-foreground mt-4">
          Note: Results are currently stored in your browser's localStorage. In a production environment,
          this data would be stored in a database and retrieved through a secure API.
        </p>
      </div>

      <Sheet open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selectedEmployee && (
            <>
              <SheetHeader className="pb-4">
                <SheetTitle className="text-2xl">Employee Assessment Details</SheetTitle>
                <SheetDescription>
                  Full DISC assessment results for {selectedEmployee.name}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-4">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedEmployee.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assessment Date</p>
                      <p className="font-medium">{selectedEmployee.date}</p>
                    </div>
                  </div>
                </div>

                {/* DISC Profile */}
                <div>
                  <h3 className="text-lg font-medium mb-2">DISC Profile</h3>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 rounded-md bg-orange-100">
                      <p className="font-semibold text-orange-500">D</p>
                      <p className="text-2xl font-bold">{selectedEmployee.scores.D}%</p>
                    </div>
                    <div className="text-center p-2 rounded-md bg-purple-100">
                      <p className="font-semibold text-purple-500">I</p>
                      <p className="text-2xl font-bold">{selectedEmployee.scores.I}%</p>
                    </div>
                    <div className="text-center p-2 rounded-md bg-green-100">
                      <p className="font-semibold text-green-500">S</p>
                      <p className="text-2xl font-bold">{selectedEmployee.scores.S}%</p>
                    </div>
                    <div className="text-center p-2 rounded-md bg-blue-100">
                      <p className="font-semibold text-blue-500">C</p>
                      <p className="text-2xl font-bold">{selectedEmployee.scores.C}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Style</p>
                      <p className={`font-bold ${getTypeColor(selectedEmployee.primaryType)}`}>
                        {selectedEmployee.primaryType} - {discDescriptions[selectedEmployee.primaryType].title}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Secondary Style</p>
                      <p className={`font-bold ${getTypeColor(selectedEmployee.secondaryType)}`}>
                        {selectedEmployee.secondaryType} - {discDescriptions[selectedEmployee.secondaryType].title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Strengths & Challenges */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Strengths</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedEmployee.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Challenges</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedEmployee.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Communication Style */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Communication Style</h3>
                  <p>{selectedEmployee.communication}</p>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                  <p>When communicating with {selectedEmployee.name}, it's best to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>{discDescriptions[selectedEmployee.primaryType].communication}</li>
                  </ul>
                </div>
              </div>

              <SheetFooter>
                <Button onClick={() => setIsDetailSheetOpen(false)}>Close</Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Admin;
