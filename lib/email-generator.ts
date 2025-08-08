import { EmailGenerationRequest, GeneratedEmail } from '@/types/email';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Fallback templates for when API is not available
const fallbackTemplates = {
  formal: [
    {
      subject: "Application for [Position] - [Your Name]",
      body: `Dear Hiring Manager,

I am writing to express my strong interest in the [position] role at your organization. With my background in [relevant field] and proven track record of success, I am confident I would be a valuable addition to your team.

Key qualifications I bring:
• [Relevant experience or skill]
• [Achievement or certification]
• [Technical or soft skill]

I have attached my resume for your review and would welcome the opportunity to discuss how my experience aligns with your needs. Thank you for considering my application.

Best regards,
[Your Name]
[Your Contact Information]`
    },
    {
      subject: "Enthusiastic Application for [Position] Position",
      body: `Dear [Hiring Manager/Team],

I am excited to submit my application for the [position] role. Your job posting immediately caught my attention because of [specific aspect that interests you].

My professional background includes:
→ [Years] of experience in [relevant area]
→ Expertise in [specific skills/tools]
→ Track record of [specific achievements]

I am particularly drawn to this opportunity because [reason related to company/role]. I believe my passion for [relevant area] and commitment to excellence would make me a strong contributor to your team.

I look forward to the possibility of discussing this opportunity further.

Sincerely,
[Your Name]`
    }
  ],
  friendly: [
    {
      subject: "Excited to Apply for [Position] - [Your Name]",
      body: `Hi there!

I hope this email finds you well. I came across the [position] opening and I'm really excited about the possibility of joining your team!

What caught my attention:
• [Interesting company aspect]
• [Appealing job responsibility]
• [Growth opportunity]

I believe my experience in [relevant area] and enthusiasm for [field/industry] would make me a great fit. I'd love to chat more about how I can contribute to your team's success.

Thanks for taking the time to review my application!

Best,
[Your Name]
[Your Contact Information]`
    },
    {
      subject: "Let's Connect About the [Position] Role!",
      body: `Hello!

I'm reaching out because I'm genuinely excited about the [position] opportunity at your company. The role seems like a perfect match for my skills and interests!

Here's what I bring to the table:
✓ [Key skill or experience]
✓ [Relevant achievement]
✓ [Personal quality or strength]

I'm particularly excited about [specific aspect of the role] and would love to learn more about how I can contribute to your team's goals.

Looking forward to connecting!

Cheers,
[Your Name]`
    }
  ],
  persuasive: [
    {
      subject: "Why I'm Your Next [Position] - [Your Name]",
      body: `Dear [Hiring Manager],

I'm not just another applicant – I'm the solution to your [position] needs. Here's why:

🎯 PROVEN RESULTS: [Specific achievement with numbers]
🚀 PERFECT FIT: My [relevant skill] directly addresses your need for [job requirement]
💡 UNIQUE VALUE: [What sets you apart]

While other candidates may have similar qualifications, I bring [unique combination of skills/experience] that will drive immediate impact for your team.

The opportunity to [specific job responsibility] excites me because [personal motivation]. I'm ready to hit the ground running and deliver results from day one.

Can we schedule a brief call this week to discuss how I can contribute to your success?

Best regards,
[Your Name]`
    },
    {
      subject: "The [Position] Candidate You've Been Searching For",
      body: `Dear Hiring Team,

Stop searching – you've found your ideal [position] candidate.

Here's what makes me different:
→ [Quantifiable achievement]
→ [Relevant expertise that solves their problem]
→ [Track record of success]

I don't just meet your requirements; I exceed them. My experience in [relevant area] has prepared me to tackle [specific challenge mentioned in job posting] head-on.

Your company's mission to [company goal] resonates deeply with me, and I'm eager to contribute to that vision with my proven ability to [relevant skill/achievement].

Let's discuss how I can drive results for your team.

Confidently yours,
[Your Name]`
    }
  ],
  academic: [
    {
      subject: "Application for [Position/Program] - [Your Name]",
      body: `Dear [Professor/Committee],

I am writing to formally apply for the [position/program] within [department/institution]. My academic background and research interests align closely with the objectives of this opportunity.

Academic Qualifications:
• [Degree] in [Field] from [Institution]
• Research focus: [Area of specialization]
• Publications: [Number] peer-reviewed papers
• Academic honors: [Relevant awards/recognition]

My research in [specific area] has contributed to [field/discipline] through [specific contribution]. I am particularly interested in [research area] and believe this opportunity would advance both my academic goals and the institution's research objectives.

I have enclosed my CV, research statement, and letters of recommendation for your consideration.

Respectfully,
[Your Name]
[Academic Title/Affiliation]`
    },
    {
      subject: "Research Application: [Position/Program] - [Your Name]",
      body: `Dear Selection Committee,

I submit this application for the [position/program] with great enthusiasm for the research opportunities it presents.

Research Background:
→ [Current research focus and methodology]
→ [Key findings or contributions]
→ [Relevant publications or presentations]

My work in [research area] addresses [specific problem/question] through [methodology/approach]. The findings have implications for [broader field/application] and align with your department's research priorities in [relevant area].

Future Research Goals:
This position would enable me to [specific research objectives] while contributing to [institutional goals]. I am particularly interested in collaborating on [specific project/area] and believe my expertise in [relevant skill] would be valuable.

Thank you for your consideration of my application.

Sincerely,
[Your Name]
[Institution/Department]`
    }
  ]
};

async function generateWithOpenAI(request: EmailGenerationRequest): Promise<GeneratedEmail> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const tonePrompts = {
    formal: "Write a formal, professional business email that follows traditional corporate communication standards.",
    friendly: "Write a warm, approachable email that maintains professionalism while being personable and engaging.",
    persuasive: "Write a compelling, results-focused email that confidently highlights value and encourages action.",
    academic: "Write a scholarly, research-oriented email that follows academic communication conventions."
  };

  const prompt = `Generate a highly personalized professional email for a job/scholarship application.

JOB/SCHOLARSHIP DESCRIPTION:
"${request.jobDescription}"

CANDIDATE'S BACKGROUND, SKILLS & EXPERIENCE:
"${request.userDescription}"

TONE: ${tonePrompts[request.tone]}

CRITICAL INSTRUCTIONS:
- You MUST use specific details from BOTH the job description AND the candidate's background
- Create both a compelling subject line and email body
- Match the candidate's exact skills and experience to the specific job requirements
- Highlight relevant technical skills, programming languages, projects, and achievements mentioned in the candidate's description
- Make direct connections between what the candidate has done and what the job requires
- Include concrete examples and numbers from the candidate's experience when mentioned
- Reference specific technologies, tools, or frameworks the candidate mentioned
- Keep it concise but compelling (3-4 paragraphs max)
- Make it unique and personalized to this specific opportunity
- Include placeholders like [Your Name], [Your Contact Information] for personalization
- Use professional language appropriate for the selected tone
- DO NOT use generic phrases - be specific to this candidate and job

Format your response as JSON with "subject" and "body" fields.`;

  try {
    console.log('Generating email with OpenAI...'); // Debug log
    console.log('Job Description length:', request.jobDescription.length);
    console.log('User Description length:', request.userDescription.length);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert professional email writer specializing in job and scholarship applications. You excel at matching candidate qualifications to specific opportunities and creating compelling, personalized emails that stand out to hiring managers and selection committees.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7, // Balanced creativity and consistency
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error response:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    console.log('OpenAI response received:', content ? 'Success' : 'No content'); // Debug log
    
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Try to parse JSON response
    try {
      const parsed = JSON.parse(content);
      return {
        subject: parsed.subject || 'Professional Application',
        body: parsed.body || content,
        generatedAt: new Date()
      };
    } catch {
      // If not JSON, treat as plain text and extract subject/body
      const lines = content.split('\n');
      const subjectLine = lines.find((line: string) => line.toLowerCase().includes('subject:'));
      const subject = subjectLine ? subjectLine.replace(/subject:\s*/i, '').trim() : 'Professional Application';
      const body = content.replace(subjectLine || '', '').trim();
      
      return {
        subject,
        body,
        generatedAt: new Date()
      };
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

function generateWithFallback(request: EmailGenerationRequest): GeneratedEmail {
  console.log('Using fallback template generation...'); // Debug log
  
  const templates = fallbackTemplates[request.tone];
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  // Enhanced personalization based on job description and user background
  let personalizedSubject = randomTemplate.subject;
  let personalizedBody = randomTemplate.body;
  
  const jobDescLower = request.jobDescription.toLowerCase();
  const userDescLower = request.userDescription.toLowerCase();
  
  // Extract specific skills and experiences from user description
  const extractUserDetails = (userDesc: string) => {
    const details = {
      skills: [] as string[],
      experience: '',
      achievements: [] as string[],
      projects: [] as string[],
      certifications: [] as string[]
    };
    
    // Extract programming languages and technologies
    const techKeywords = ['react', 'javascript', 'typescript', 'python', 'node.js', 'java', 'c++', 'sql', 'mongodb', 'aws', 'docker', 'kubernetes', 'git', 'html', 'css', 'vue', 'angular', 'express', 'django', 'flask', 'spring', 'laravel', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'tensorflow', 'pytorch', 'machine learning', 'ai', 'data science', 'blockchain', 'devops', 'api', 'rest', 'graphql'];
    
    techKeywords.forEach(tech => {
      if (userDesc.toLowerCase().includes(tech)) {
        details.skills.push(tech.charAt(0).toUpperCase() + tech.slice(1));
      }
    });
    
    // Extract experience years
    const yearMatch = userDesc.match(/(\d+)\s*years?\s*(of\s*)?(experience|exp)/i);
    if (yearMatch) {
      details.experience = `${yearMatch[1]} years of experience`;
    }
    
    // Extract achievements with numbers/percentages
    const achievementPatterns = [
      /increased?\s+[^.!?]*?(\d+%[^.!?]*)/gi,
      /improved?\s+[^.!?]*?(\d+%[^.!?]*)/gi,
      /reduced?\s+[^.!?]*?(\d+%[^.!?]*)/gi,
      /boosted?\s+[^.!?]*?(\d+%[^.!?]*)/gi,
      /built?\s+([^.!?]+)/gi,
      /created?\s+([^.!?]+)/gi,
      /developed?\s+([^.!?]+)/gi,
      /designed?\s+([^.!?]+)/gi,
      /implemented?\s+([^.!?]+)/gi,
      /launched?\s+([^.!?]+)/gi,
      /managed?\s+([^.!?]+)/gi,
      /led\s+([^.!?]+)/gi,
      /delivered?\s+([^.!?]+)/gi,
      /completed?\s+([^.!?]+)/gi,
      /achieved?\s+([^.!?]+)/gi,
      /optimized?\s+([^.!?]+)/gi,
      /automated?\s+([^.!?]+)/gi,
      /scaled?\s+([^.!?]+)/gi
    ];
    
    achievementPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(userDesc)) !== null) {
        if (match[1] && match[1].length < 100) {
          details.achievements.push(match[1].trim());
        }
        // Reset regex lastIndex to avoid infinite loop
        if (!pattern.global) break;
      }
      // Reset regex for next use
      pattern.lastIndex = 0;
    });
    
    // Extract certifications
    const certKeywords = ['certified', 'certification', 'aws', 'google cloud', 'azure', 'comptia', 'cisco', 'oracle', 'microsoft', 'pmp', 'scrum master', 'agile'];
    certKeywords.forEach(cert => {
      if (userDesc.toLowerCase().includes(cert)) {
        details.certifications.push(cert);
      }
    });
    
    return details;
  };
  
  const userDetails = extractUserDetails(request.userDescription);
  
  // Determine position type from job description
  if (jobDescLower.includes('software') || jobDescLower.includes('developer') || jobDescLower.includes('engineer')) {
    personalizedSubject = personalizedSubject.replace('[Position]', 'Software Developer Position');
    personalizedBody = personalizedBody.replace(/\[position\]/g, 'Software Developer position');
  } else if (jobDescLower.includes('marketing')) {
    personalizedSubject = personalizedSubject.replace('[Position]', 'Marketing Specialist Position');
    personalizedBody = personalizedBody.replace(/\[position\]/g, 'Marketing Specialist position');
  } else if (jobDescLower.includes('data') && (jobDescLower.includes('scientist') || jobDescLower.includes('analyst'))) {
    personalizedSubject = personalizedSubject.replace('[Position]', 'Data Scientist Position');
    personalizedBody = personalizedBody.replace(/\[position\]/g, 'Data Scientist position');
  } else if (jobDescLower.includes('scholarship') || jobDescLower.includes('academic')) {
    personalizedSubject = personalizedSubject.replace('[Position/Program]', 'Academic Scholarship Program');
    personalizedBody = personalizedBody.replace(/\[position\/program\]/g, 'academic scholarship');
  } else {
    personalizedSubject = personalizedSubject.replace('[Position]', 'Open Position');
    personalizedBody = personalizedBody.replace(/\[position\]/g, 'open position');
  }
  
  // Add relevant experience from user description
  let relevantField = 'technology';
  if (userDescLower.includes('react') || userDescLower.includes('javascript') || userDescLower.includes('frontend')) {
    relevantField = 'frontend development';
  } else if (userDescLower.includes('python') || userDescLower.includes('machine learning') || userDescLower.includes('ai')) {
    relevantField = 'data science and AI';
  } else if (userDescLower.includes('backend') || userDescLower.includes('server') || userDescLower.includes('database')) {
    relevantField = 'backend development';
  } else if (userDescLower.includes('design') || userDescLower.includes('ui') || userDescLower.includes('ux')) {
    relevantField = 'design and user experience';
  }
  
  // Replace generic placeholders with extracted user details
  personalizedBody = personalizedBody.replace(/\[relevant field\]/g, relevantField);
  personalizedBody = personalizedBody.replace(/\[relevant area\]/g, relevantField);
  personalizedBody = personalizedBody.replace(/\[Years\]/g, userDetails.experience || 'Several years');
  
  // Replace skill-related placeholders
  if (userDetails.skills.length > 0) {
    const skillsList = userDetails.skills.slice(0, 5).join(', ');
    personalizedBody = personalizedBody.replace(/\[specific skills\/tools\]/g, skillsList);
    personalizedBody = personalizedBody.replace(/\[Key skill or experience\]/g, `Expertise in ${userDetails.skills[0]}`);
    personalizedBody = personalizedBody.replace(/\[relevant skill\]/g, userDetails.skills[0] || 'technical skills');
    personalizedBody = personalizedBody.replace(/\[Technical or soft skill\]/g, userDetails.skills[0] || 'technical expertise');
  }
  
  // Replace achievement placeholders
  if (userDetails.achievements.length > 0) {
    personalizedBody = personalizedBody.replace(/\[Relevant achievement\]/g, userDetails.achievements[0]);
    personalizedBody = personalizedBody.replace(/\[Achievement or certification\]/g, userDetails.achievements[0] || 'Professional achievement');
    personalizedBody = personalizedBody.replace(/\[specific achievements\]/g, userDetails.achievements[0] || 'demonstrated results');
    personalizedBody = personalizedBody.replace(/\[Quantifiable achievement\]/g, userDetails.achievements[0] || 'measurable results');
    personalizedBody = personalizedBody.replace(/\[Specific achievement with numbers\]/g, userDetails.achievements[0] || 'proven track record');
    personalizedBody = personalizedBody.replace(/\[Track record of specific achievements\]/g, userDetails.achievements[0] || 'proven track record of success');
  } else {
    // If no achievements found, provide fallback text
    personalizedBody = personalizedBody.replace(/\[specific achievements\]/g, 'successful project delivery');
    personalizedBody = personalizedBody.replace(/\[Relevant achievement\]/g, 'Professional accomplishments');
    personalizedBody = personalizedBody.replace(/\[Achievement or certification\]/g, 'Technical expertise');
    personalizedBody = personalizedBody.replace(/\[Quantifiable achievement\]/g, 'proven results');
    personalizedBody = personalizedBody.replace(/\[Specific achievement with numbers\]/g, 'demonstrated success');
    personalizedBody = personalizedBody.replace(/\[Track record of specific achievements\]/g, 'consistent performance');
  }
  
  // Replace experience placeholders
  personalizedBody = personalizedBody.replace(/\[relevant experience or skill\]/g, `${userDetails.experience || 'Professional experience'} in ${relevantField}`);
  personalizedBody = personalizedBody.replace(/\[unique combination of skills\/experience\]/g, `combination of ${userDetails.skills.slice(0, 2).join(' and ')} expertise`);
  personalizedBody = personalizedBody.replace(/\[Personal quality or strength\]/g, userDetails.skills.length > 2 ? `Strong background in ${userDetails.skills[2]}` : 'Strong technical foundation');
  
  // Replace other placeholders with contextual information
  personalizedBody = personalizedBody.replace(/\[What sets you apart\]/g, userDetails.skills.length > 0 ? `Specialized expertise in ${userDetails.skills[0]}` : 'Unique technical perspective');
  personalizedBody = personalizedBody.replace(/\[relevant skill\/achievement\]/g, userDetails.achievements[0] || userDetails.skills[0] || 'professional expertise');
  
  // Additional comprehensive placeholder replacements
  personalizedBody = personalizedBody.replace(/\[field\/industry\]/g, relevantField);
  personalizedBody = personalizedBody.replace(/\[specific aspect that interests you\]/g, `the opportunity to work with ${userDetails.skills[0] || 'modern technologies'}`);
  personalizedBody = personalizedBody.replace(/\[Interesting company aspect\]/g, `their use of ${userDetails.skills[0] || 'technology'}`);
  personalizedBody = personalizedBody.replace(/\[Appealing job responsibility\]/g, `working with ${userDetails.skills.slice(0, 2).join(' and ') || 'technical challenges'}`);
  personalizedBody = personalizedBody.replace(/\[Growth opportunity\]/g, `advancing my ${relevantField} skills`);
  personalizedBody = personalizedBody.replace(/\[reason related to company\/role\]/g, `it aligns with my expertise in ${userDetails.skills[0] || 'technology'}`);
  personalizedBody = personalizedBody.replace(/\[specific aspect of the role\]/g, `utilizing my ${userDetails.skills[0] || 'technical'} skills`);
  personalizedBody = personalizedBody.replace(/\[job requirement\]/g, userDetails.skills[0] || 'technical expertise');
  personalizedBody = personalizedBody.replace(/\[specific job responsibility\]/g, `applying my ${userDetails.skills[0] || 'technical'} expertise`);
  personalizedBody = personalizedBody.replace(/\[personal motivation\]/g, `it leverages my passion for ${relevantField}`);
  personalizedBody = personalizedBody.replace(/\[Relevant expertise that solves their problem\]/g, `${userDetails.skills[0] || 'Technical'} expertise that addresses their needs`);
  personalizedBody = personalizedBody.replace(/\[Track record of success\]/g, userDetails.achievements[0] || userDetails.experience || 'consistent professional growth');
  
  console.log('Generated fallback email with extracted details:', {
    field: relevantField, 
    skills: userDetails.skills.slice(0, 3),
    achievements: userDetails.achievements.slice(0, 2),
    experience: userDetails.experience
  });
  
  return {
    subject: personalizedSubject,
    body: personalizedBody,
    generatedAt: new Date()
  };
}

export async function generateEmail(request: EmailGenerationRequest, useAI: boolean = true): Promise<GeneratedEmail> {
  console.log('generateEmail called with:', {
    jobDescLength: request.jobDescription.length,
    userDescLength: request.userDescription.length,
    tone: request.tone,
    useAI,
    hasApiKey: !!OPENAI_API_KEY
  });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
  
  if (useAI && OPENAI_API_KEY) {
    try {
      console.log('Attempting OpenAI generation...');
      const result = await generateWithOpenAI(request);
      console.log('OpenAI generation successful');
      return result;
    } catch (error) {
      console.warn('OpenAI generation failed, falling back to template generation:', error);
      return generateWithFallback(request);
    }
  } else {
    console.log('Using fallback generation (AI disabled or no API key)');
    return generateWithFallback(request);
  }
}