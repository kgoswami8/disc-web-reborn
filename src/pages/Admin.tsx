
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { discDescriptions, DiscType } from '@/lib/disc-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

// Mock data for admin view
const mockResults = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    date: '2025-04-28', 
    primaryType: 'D' as DiscType, 
    secondaryType: 'I' as DiscType,
    scores: { D: 75, I: 60, S: 30, C: 45 },
    strengths: ['Takes initiative', 'Gets results', 'Makes quick decisions'],
    challenges: ['Can be impatient', 'May overlook details', 'Can be too direct'],
    communication: 'Prefers direct, straightforward communication focused on results.'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    date: '2025-04-29', 
    primaryType: 'S' as DiscType, 
    secondaryType: 'C' as DiscType,
    scores: { D: 25, I: 40, S: 80, C: 65 },
    strengths: ['Patient', 'Reliable', 'Good listener', 'Detail-oriented'],
    challenges: ['May resist change', 'Can avoid conflict', 'May be indecisive'],
    communication: 'Prefers gentle, personal communication with time to process information.'
  },
  { 
    id: 3, 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    date: '2025-05-01', 
    primaryType: 'I' as DiscType, 
    secondaryType: 'D' as DiscType,
    scores: { D: 55, I: 85, S: 30, C: 35 },
    strengths: ['Enthusiastic', 'Persuasive', 'Inspiring', 'Optimistic'],
    challenges: ['May talk too much', 'Can be disorganized', 'Might overpromise'],
    communication: 'Enjoys socializing, storytelling and expressing ideas in an engaging way.'
  },
  { 
    id: 4, 
    name: 'Bob Williams', 
    email: 'bob@example.com', 
    date: '2025-04-30', 
    primaryType: 'C' as DiscType, 
    secondaryType: 'S' as DiscType,
    scores: { D: 35, I: 25, S: 60, C: 90 },
    strengths: ['Analytical', 'Detail-oriented', 'Organized', 'Thorough'],
    challenges: ['Can be overly critical', 'May be perfectionistic', 'Might avoid risk'],
    communication: 'Prefers communication based on logic, facts, and details with time to analyze.'
  },
];

const Admin = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof mockResults[0] | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

  const handleLogin = () => {
    // In a real app, this would validate against a backend
    // For demo purposes, use a simple password
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const filteredResults = filter === 'all' 
    ? mockResults 
    : mockResults.filter(result => result.primaryType === filter);

  const getTypeColor = (type: DiscType) => {
    const colors = {
      'D': 'text-orange-500',
      'I': 'text-purple-500',
      'S': 'text-green-500',
      'C': 'text-blue-500'
    };
    return colors[type];
  };

  const handleViewDetails = (employee: typeof mockResults[0]) => {
    setSelectedEmployee(employee);
    setIsDetailSheetOpen(true);
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
        <h1 className="text-3xl font-bold mb-6">DISC Assessment Results</h1>
        
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
                {filteredResults.map((result) => (
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <p className="text-sm text-muted-foreground mt-4">
          Note: In a production environment, this data would be stored in a database and retrieved through a secure API.
          The current implementation uses mock data for demonstration purposes.
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
