
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DiscType } from '@/lib/disc-data';

interface ResultsFilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

const ResultsFilter: React.FC<ResultsFilterProps> = ({ filter, setFilter }) => {
  return (
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
  );
};

export default ResultsFilter;
