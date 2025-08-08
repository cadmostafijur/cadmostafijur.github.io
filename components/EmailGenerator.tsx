'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Copy, Download, RefreshCw, Wand2, CheckCircle2, Lightbulb, FileText } from "lucide-react";
import { toast } from "sonner";
import { EmailGenerationRequest, GeneratedEmail, ToneOption } from '@/types/email';
import { generateEmail } from '@/lib/email-generator';

const toneOptions: ToneOption[] = [
  {
    value: 'formal',
    label: 'Formal',
    description: 'Professional and traditional business tone'
  },
  {
    value: 'friendly',
    label: 'Friendly',
    description: 'Warm and approachable communication style'
  },
  {
    value: 'persuasive',
    label: 'Persuasive',
    description: 'Compelling and results-focused language'
  },
  {
    value: 'academic',
    label: 'Academic',
    description: 'Scholarly and research-oriented approach'
  }
];

export default function EmailGenerator() {
  const [jobDescription, setJobDescription] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [selectedTone, setSelectedTone] = useState<'formal' | 'friendly' | 'persuasive' | 'academic'>('formal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Sample data for demonstration
  const sampleJobDescription = `Software Engineer - Full Stack Developer
  
We are looking for a passionate Full Stack Developer to join our team. You will work on building scalable web applications using modern technologies.

Requirements:
- 3+ years experience with React and Node.js
- Experience with databases (MongoDB, PostgreSQL)
- Knowledge of cloud platforms (AWS preferred)
- Strong problem-solving skills
- Experience with API development`;

  const sampleUserDescription = `I have 4 years of experience as a Full Stack Developer with expertise in React, Node.js, and Python. I built an e-commerce platform that increased sales by 30% and reduced page load times by 50%. I'm AWS certified and have experience with MongoDB and PostgreSQL. I led a team of 3 developers on a project that automated inventory management, saving the company $100K annually.`;

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description first!");
      return;
    }
    if (!userDescription.trim()) {
      toast.error("Please tell us about your skills and experience!");
      return;
    }

    console.log('Starting email generation...'); // Debug log
    console.log('Job Description:', jobDescription.substring(0, 100) + '...');
    console.log('User Description:', userDescription.substring(0, 100) + '...');

    setIsGenerating(true);
    try {
      const request: EmailGenerationRequest = {
        jobDescription: jobDescription.trim(),
        userDescription: userDescription.trim(),
        tone: selectedTone
      };
      
      const email = await generateEmail(request);
      setGeneratedEmail(email);
      
      // Check if the email actually uses user details
      const emailText = email.body.toLowerCase();
      const userWords = userDescription.toLowerCase().split(' ');
      const matchedWords = userWords.filter(word => 
        word.length > 3 && emailText.includes(word)
      ).length;
      
      if (matchedWords > 0) {
        toast.success("Personalized email generated successfully!");
      } else {
        toast.success("Email generated! Note: Using template format due to API limitations.");
      }
      
      console.log('Email generation completed successfully');
      setShowPreview(true);
    } catch (error) {
      console.error('Email generation failed:', error);
      toast.error("Failed to generate email. Please check your inputs and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseSample = () => {
    setJobDescription(sampleJobDescription);
    setUserDescription(sampleUserDescription);
    toast.success("Sample data loaded! You can edit it or generate an email.");
  };

  const handleClearAll = () => {
    setJobDescription('');
    setUserDescription('');
    setGeneratedEmail(null);
    setShowPreview(false);
    toast.success("All fields cleared!");
  };

  const handleCopy = async () => {
    if (!generatedEmail) return;
    
    const emailText = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    
    try {
      await navigator.clipboard.writeText(emailText);
      setCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy email");
    }
  };

  const handleDownload = () => {
    if (!generatedEmail) return;
    
    const emailText = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    const blob = new Blob([emailText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Email downloaded!");
  };

  const handleRegenerate = () => {
    // Force regeneration with AI to get different structure
    handleGenerate();
  };

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            AI-Powered Email Generator
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Create personalized, professional emails by combining job requirements with your unique skills and experience
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={handleUseSample}
              className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/30"
            >
              📝 Try Sample Data
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearAll}
              className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              🗑️ Clear All Fields
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Input Section */}
          <div className="space-y-6">
            
            {/* Step 1: Job Description */}
            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    1
                  </div>
                  <CardTitle className="text-xl text-card-foreground">Job/Scholarship Description</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Paste the complete job posting or scholarship description. Include requirements, responsibilities, and any specific skills mentioned.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job posting or scholarship description here...

Example:
- Software Engineer position
- 3+ years React experience required  
- Node.js and database knowledge
- AWS cloud platform preferred
- Team collaboration skills..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[160px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  Characters: {jobDescription.length} | Recommended: 200-800 characters
                </div>
              </CardContent>
            </Card>

            {/* Step 2: User Skills */}
            <Card className="border-2 border-green-200 dark:border-green-800 bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm">
                    2
                  </div>
                  <CardTitle className="text-xl text-card-foreground">Your Skills & Experience</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Describe your technical skills, projects, achievements, and relevant experience with specific details and numbers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your technical skills, projects, and achievements...

Example:
- I have 4 years experience with React, Node.js, and Python
- Built an e-commerce platform that increased sales by 30%
- AWS certified with MongoDB and PostgreSQL experience  
- Led a team of 3 developers on automation project
- Reduced page load times by 50% through optimization..."
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  className="min-h-[160px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  Characters: {userDescription.length} | Recommended: 200-600 characters
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Email Tone */}
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold text-sm">
                    3
                  </div>
                  <CardTitle className="text-xl text-card-foreground">Email Tone</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Choose the communication style that best fits the opportunity and your personality.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedTone} onValueChange={(value: any) => setSelectedTone(value)}>
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select email tone" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {toneOptions.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value} className="text-foreground hover:bg-muted">
                        <div className="flex flex-col">
                          <span className="font-medium">{tone.label}</span>
                          <span className="text-xs text-muted-foreground">{tone.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim() || !userDescription.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-3 h-5 w-5 animate-spin" />
                  Generating Personalized Email...
                </>
              ) : (
                <>
                  <Wand2 className="mr-3 h-5 w-5" />
                  Generate AI-Powered Email
                </>
              )}
            </Button>
            
          </div>

          {/* Generated Email Result */}
          
          {/* Results Section */}
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Your Generated Email</h3>
              {generatedEmail && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/30"
                  >
                    {showPreview ? '📝 Edit View' : '👁️ Preview'}
                  </Button>
                </div>
              )}
            </div>

            {/* Generated Email Display */}
            {generatedEmail ? (
              <div className="space-y-4">
                {/* Email Subject */}
                <Card className="border-2 border-indigo-200 dark:border-indigo-800 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                        📧 Subject Line
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(generatedEmail.subject)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium bg-muted/30 p-3 rounded-lg border">
                      {generatedEmail.subject}
                    </p>
                  </CardContent>
                </Card>

                {/* Email Body */}
                <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
                        ✉️ Email Body
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(generatedEmail.body)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(`Subject: ${generatedEmail.subject}

${generatedEmail.body}`)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {showPreview ? (
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border shadow-sm">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Subject:</div>
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{generatedEmail.subject}</div>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {generatedEmail.body.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-3 text-gray-800 dark:text-gray-200 leading-relaxed">
                              {paragraph.trim() === '' ? '\u00A0' : paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Textarea
                        value={generatedEmail.body}
                        onChange={(e) => setGeneratedEmail(prev => prev ? {...prev, body: e.target.value} : null)}
                        className="min-h-[300px] resize-none bg-background border-border text-foreground font-mono text-sm leading-relaxed"
                      />
                    )}
                  </CardContent>
                </Card>

                {/* Email Tips */}
                <Card className="border border-orange-200 dark:border-orange-800 bg-gradient-to-r from-orange-50/50 to-yellow-50/50 dark:from-orange-950/20 dark:to-yellow-950/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Lightbulb className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Email Success Tips</h4>
                        <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
                          <li>• Review and personalize the email before sending</li>
                          <li>• Check the recipient's name and company details</li>
                          <li>• Follow up within 1-2 weeks if no response</li>
                          <li>• Customize the subject line if needed</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleGenerate}
                    variant="outline"
                    className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/30"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate Email
                  </Button>
                  <Button
                    onClick={() => navigator.clipboard.writeText(`Subject: ${generatedEmail.subject}

${generatedEmail.body}`)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Full Email
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-card/50">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                        <Wand2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Generate!</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Fill in both fields and click the generate button to create your personalized email.
                    </p>
                    {/* Progress Indicators */}
                    <div className="space-y-3 max-w-xs mx-auto">
                      <div className="flex items-center justify-between text-sm">
                        <span className={jobDescription.trim() ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                          Job Description
                        </span>
                        <span className={jobDescription.trim() ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                          {jobDescription.trim() ? "✓" : "○"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={userDescription.trim() ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                          Your Skills
                        </span>
                        <span className={userDescription.trim() ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                          {userDescription.trim() ? "✓" : "○"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={selectedTone !== 'formal' ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                          Email Tone
                        </span>
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">✨ AI-Powered Personalization</h3>
            <p className="text-sm text-muted-foreground">Our AI analyzes both the job requirements and your background to create perfectly matched emails</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">🎯 Smart Matching</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Connects your skills to job requirements</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">⚡ OpenAI Powered</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Uses advanced GPT models for quality</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">🔒 Private & Secure</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Your data is never stored or shared</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-card border border-border">
              <div className="text-lg sm:text-xl font-semibold text-card-foreground mb-2">📝 Multiple Formats</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Copy, download, or regenerate easily</div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 sm:mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 sm:p-6">
              <h4 className="text-base sm:text-lg font-semibold text-card-foreground mb-3">💡 Tips for Better Results:</h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
                <li>• <strong>Be specific</strong> about your technical skills, programming languages, and tools</li>
                <li>• <strong>Include numbers</strong> when describing achievements (e.g., "increased efficiency by 30%")</li>
                <li>• <strong>Mention relevant projects</strong> that demonstrate your capabilities</li>
                <li>• <strong>Add certifications</strong> and educational background when relevant</li>
                <li>• <strong>Describe your experience level</strong> in different technologies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};