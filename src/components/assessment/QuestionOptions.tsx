
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DiscType } from '@/lib/disc-data';

interface QuestionOptionProps {
  options: {
    text: string;
    type: DiscType;
    score: number;
  }[];
  selectedOption: DiscType | null;
  onSelectOption: (optionType: DiscType) => void;
  type: 'most' | 'least';
}

const QuestionOptions = ({ options, selectedOption, onSelectOption, type }: QuestionOptionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary border-b pb-2">
        I am {type === 'most' ? 'MOST' : 'LEAST'} likely to:
      </h3>
      <RadioGroup 
        value={selectedOption || ""}
        onValueChange={(value) => onSelectOption(value as DiscType)}
        className="space-y-3"
      >
        {options.map((option, index) => (
          <label 
            key={`${type}-${index}`} 
            className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent cursor-pointer"
            onClick={() => onSelectOption(option.type)}
          >
            <RadioGroupItem value={option.type} id={`${type}-${index}`} />
            <span className="flex-1">{option.text}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionOptions;
