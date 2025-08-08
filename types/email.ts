export interface EmailGenerationRequest {
  jobDescription: string;
  userDescription: string; // User's technical skills, experience, and knowledge
  tone: 'formal' | 'friendly' | 'persuasive' | 'academic';
}

export interface GeneratedEmail {
  subject: string;
  body: string;
  generatedAt: Date;
}

export interface ToneOption {
  value: 'formal' | 'friendly' | 'persuasive' | 'academic';
  label: string;
  description: string;
}