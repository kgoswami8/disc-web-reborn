
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { discDescriptions, DiscType } from '@/lib/disc-data';

// Mock data for admin view
const mockResults = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    date: '2025-04-28', 
    primaryType: 'D' as DiscType, 
    secondaryType: 'I' as DiscType,
    scores: { D: 75, I: 60, S: 30, C: 45 }
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    date: '2025-04-29', 
    primaryType: 'S' as DiscType, 
    secondaryType: 'C' as DiscType,
    scores: { D: 25, I: 40, S: 80, C: 65 }
  },
  { 
    id: 3, 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    date: '2025-05-01', 
    primaryType: 'I' as DiscType, 
    secondaryType: 'D' as DiscType,
    scores: { D: 55, I: 85, S: 30, C: 35 }
  },
  { 
    id: 4, 
    name: 'Bob Williams', 
    email: 'bob@example.com', 
    date: '2025-04-30', 
    primaryType: 'C' as DiscType, 
    secondaryType: 'S' as DiscType,
    scores: { D: 35, I: 25, S: 60, C: 90 }
  },
];

const Admin = () => {
  const [filter, setFilter] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

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
              <input 
                id="password"
                type="password"
                className="w-full p-2 border rounded"
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
    </div>
  );
};

export default Admin;
