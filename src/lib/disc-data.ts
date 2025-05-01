
export type DiscType = 'D' | 'I' | 'S' | 'C';

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    type: DiscType;
    score: number;
  }[];
}

export interface DiscProfile {
  D: number;
  I: number;
  S: number;
  C: number;
}

export interface DiscResult {
  primary: DiscType;
  secondary?: DiscType;
  profile: DiscProfile;
  description: string;
}

export const discDescriptions = {
  D: {
    title: "Dominance",
    description: "People with high D are direct, decisive, problem solvers, risk takers, and self-starters. They tend to be direct and straightforward and like to take control of situations.",
    strengths: ["Results-oriented", "Bold", "Assertive", "Confident", "Decisive"],
    challenges: ["May appear bossy", "Can be impatient", "Might overlook details", "Can be argumentative"],
    communication: "Be clear, specific, and to the point. Focus on results and avoid too many details."
  },
  I: {
    title: "Influence",
    description: "People with high I are interactive, influencing, engaging, optimistic, and enthusiastic. They tend to be outgoing, talkative, and enjoy being the center of attention.",
    strengths: ["Enthusiastic", "Persuasive", "Collaborative", "Inspiring", "Optimistic"],
    challenges: ["May talk too much", "Can be disorganized", "Might overpromise", "Can be impulsive"],
    communication: "Allow time to socialize. Be engaging, personal, and leave time for opinions and stories."
  },
  S: {
    title: "Steadiness",
    description: "People with high S are supportive, steady, stable, security-oriented, and shy of change. They tend to be patient, reliable, and great team players.",
    strengths: ["Patient", "Reliable", "Supportive", "Team player", "Good listener"],
    challenges: ["May resist change", "Can be indecisive", "Might avoid conflict", "Can be too accommodating"],
    communication: "Be sincere and personal. Outline how and why of change. Provide reassurance and avoid rushing."
  },
  C: {
    title: "Conscientiousness",
    description: "People with high C are concerned, careful, correct, competent, and contemplative. They tend to be analytical, detail-oriented, and concerned with accuracy.",
    strengths: ["Analytical", "Detail-oriented", "Systematic", "Precise", "Logical"],
    challenges: ["May be overly critical", "Can be too detail-focused", "Might be perfectionistic", "Can be overly cautious"],
    communication: "Be logical, accurate, and structured. Provide data and facts. Respect their need for details."
  }
};

export const questions: Question[] = [
  {
    id: 1,
    text: "When faced with a challenge, I tend to:",
    options: [
      { text: "Take charge and find solutions quickly", type: "D", score: 5 },
      { text: "Talk through options with others", type: "I", score: 5 },
      { text: "Take my time to consider all angles", type: "S", score: 5 },
      { text: "Analyze the data and details first", type: "C", score: 5 }
    ]
  },
  {
    id: 2,
    text: "In team discussions, I am usually:",
    options: [
      { text: "Direct and to the point", type: "D", score: 5 },
      { text: "Enthusiastic and expressive", type: "I", score: 5 },
      { text: "Supportive and patient", type: "S", score: 5 },
      { text: "Logical and analytical", type: "C", score: 5 }
    ]
  },
  {
    id: 3,
    text: "My ideal work environment is:",
    options: [
      { text: "Fast-paced with opportunities to lead", type: "D", score: 5 },
      { text: "Collaborative with lots of interaction", type: "I", score: 5 },
      { text: "Stable with a supportive team", type: "S", score: 5 },
      { text: "Structured with attention to quality", type: "C", score: 5 }
    ]
  },
  {
    id: 4,
    text: "When making decisions, I typically:",
    options: [
      { text: "Decide quickly and confidently", type: "D", score: 5 },
      { text: "Consider how people will feel about it", type: "I", score: 5 },
      { text: "Take time to ensure everyone is comfortable", type: "S", score: 5 },
      { text: "Research all options thoroughly", type: "C", score: 5 }
    ]
  },
  {
    id: 5,
    text: "When dealing with conflict, I tend to:",
    options: [
      { text: "Address it directly and immediately", type: "D", score: 5 },
      { text: "Talk it out in an optimistic way", type: "I", score: 5 },
      { text: "Seek compromise and harmony", type: "S", score: 5 },
      { text: "Analyze the facts and stick to policies", type: "C", score: 5 }
    ]
  },
  {
    id: 6,
    text: "My communication style can be described as:",
    options: [
      { text: "Brief, clear, and results-focused", type: "D", score: 5 },
      { text: "Animated, inspirational, and story-based", type: "I", score: 5 },
      { text: "Patient, thoughtful, and considerate", type: "S", score: 5 },
      { text: "Precise, systematic, and detail-oriented", type: "C", score: 5 }
    ]
  },
  {
    id: 7,
    text: "Under stress, I might:",
    options: [
      { text: "Become demanding and impatient", type: "D", score: 5 },
      { text: "Talk more and listen less", type: "I", score: 5 },
      { text: "Withdraw and become indecisive", type: "S", score: 5 },
      { text: "Become overly critical and perfectionistic", type: "C", score: 5 }
    ]
  },
  {
    id: 8,
    text: "I am motivated by:",
    options: [
      { text: "Results, challenges, and control", type: "D", score: 5 },
      { text: "Recognition, social approval, and fun", type: "I", score: 5 },
      { text: "Security, harmony, and maintaining stability", type: "S", score: 5 },
      { text: "Quality, accuracy, and logical processes", type: "C", score: 5 }
    ]
  },
  {
    id: 9,
    text: "When planning a project, I focus on:",
    options: [
      { text: "Setting goals and driving for results", type: "D", score: 5 },
      { text: "Getting everyone excited and involved", type: "I", score: 5 },
      { text: "Establishing a reliable, steady process", type: "S", score: 5 },
      { text: "Creating detailed plans and systems", type: "C", score: 5 }
    ]
  },
  {
    id: 10,
    text: "My greatest strengths include:",
    options: [
      { text: "Taking initiative and driving change", type: "D", score: 5 },
      { text: "Inspiring others and creating enthusiasm", type: "I", score: 5 },
      { text: "Supporting team members and maintaining calm", type: "S", score: 5 },
      { text: "Ensuring accuracy and solving complex problems", type: "C", score: 5 }
    ]
  },
  {
    id: 11,
    text: "When receiving feedback, I prefer it to be:",
    options: [
      { text: "Direct, brief, and focused on results", type: "D", score: 5 },
      { text: "Positive, enthusiastic, and public", type: "I", score: 5 },
      { text: "Gentle, private, and constructive", type: "S", score: 5 },
      { text: "Specific, objective, and logical", type: "C", score: 5 }
    ]
  },
  {
    id: 12,
    text: "My approach to rules is:",
    options: [
      { text: "Rules are guidelines that can be challenged", type: "D", score: 5 },
      { text: "Rules can be flexible depending on relationships", type: "I", score: 5 },
      { text: "Rules provide helpful structure and stability", type: "S", score: 5 },
      { text: "Rules are important and should be followed precisely", type: "C", score: 5 }
    ]
  }
];

export const calculateDiscProfile = (answers: { questionId: number; optionType: DiscType }[]): DiscResult => {
  // Initialize scores
  const profile: DiscProfile = { D: 0, I: 0, S: 0, C: 0 };
  
  // Calculate scores
  answers.forEach(answer => {
    profile[answer.optionType] += 1;
  });
  
  // Find primary and secondary types
  const types: DiscType[] = ['D', 'I', 'S', 'C'];
  types.sort((a, b) => profile[b] - profile[a]);
  
  const primary = types[0];
  const secondary = profile[types[1]] > 0 ? types[1] : undefined;
  
  // Create description based on primary (and optionally secondary) type
  let description = discDescriptions[primary].description;
  
  if (secondary) {
    description += " With " + secondary + " as your secondary style, you also tend to " + 
      (secondary === 'D' ? "be direct and results-oriented." :
       secondary === 'I' ? "be social and enthusiastic." :
       secondary === 'S' ? "be steady and supportive." :
       "be detail-oriented and analytical.");
  }
  
  return {
    primary,
    secondary,
    profile,
    description
  };
};

export function getDiscColor(type: DiscType): string {
  switch (type) {
    case 'D': return 'text-disc-d';
    case 'I': return 'text-disc-i';
    case 'S': return 'text-disc-s';
    case 'C': return 'text-disc-c';
    default: return 'text-primary';
  }
}

export function getDiscBgColor(type: DiscType): string {
  switch (type) {
    case 'D': return 'bg-disc-d';
    case 'I': return 'bg-disc-i';
    case 'S': return 'bg-disc-s';
    case 'C': return 'bg-disc-c';
    default: return 'bg-primary';
  }
}
