
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DiscType, discDescriptions } from '@/lib/disc-data';
import { ProcessedResult } from '@/hooks/useAssessmentResults';
import { Eye } from 'lucide-react';

interface ResultsTableProps {
  results: ProcessedResult[];
  onViewDetails: (employee: ProcessedResult) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, onViewDetails }) => {
  const getTypeColor = (type: DiscType) => {
    const colors = {
      'D': 'text-orange-500',
      'I': 'text-purple-500',
      'S': 'text-green-500',
      'C': 'text-blue-500'
    };
    return colors[type];
  };

  return (
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
        {results.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="text-center py-6">
              No assessment results found. Once users complete assessments, their results will appear here.
            </TableCell>
          </TableRow>
        ) : (
          results.map((result) => (
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
                <Button size="sm" variant="outline" onClick={() => onViewDetails(result)}>
                  <Eye className="mr-1 h-4 w-4" /> View Details
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ResultsTable;
