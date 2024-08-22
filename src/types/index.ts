import { checkFileType } from '@/lib/utils';
import z from 'zod';

export const SchemaLogin = z.object({
  email: z.string().email({message:'Need a valid email'}).min(1, { message: 'Need a email' })
});

export const SchemaUploadCV = z.object({
  name: z.string().min(1, { message: 'Need a name' }),
  description:z.string().min(1,{message:'need a description my friend'}),
  cv: z.any()
});

export interface FormDataRegister {
  email: string;
  password: string;
  username: string;
}

export const schemaProfile = z.object({
  firstname: z.string().min(1, { message: 'Cannot be empty' }),
  lastname: z.string().min(1, { message: 'Cannot be empty' }),
  email: z.string().email({ message: 'Invalid email format' }),
});

export const schemaLetter = z.object({
  content: z.string().min(1, { message: 'Cannot be empty' }),
  cv: z.string().min(1,{ message: 'Invalid email format' }),
  template: z.string().min(1,{ message: 'Invalid email format' }),
});
export const newschemaLetter = z.object({
  name:z.string().min(1,{message:"need a name"}),
  content: z.string().min(1, { message: 'Cannot be empty' }),
  extrainfo: z.string().optional(),
  companyinfo:z.string().min(1,{message:"Need some info about the company"}),
  cv: z.string().min(1,{ message: 'Invalid email format' }),
  template: z.string().min(1,{ message: 'Invalid email format' }),
});

export const schemaHistory= z.object({
  id: z.string().min(1, { message: 'Need a id' }),
  letter: z.string().min(1, { message: 'Cannot be empty' }),
  name: z.string().min(1,{ message: 'need the name' }),
  createdAt: z.date({ message: 'Need' }),
  updatedAt: z.date({ message: 'Invalid email format' }),
  version: z.string().min(1,{ message: 'Invalid email format' }),
  userId: z.string().min(1,{ message: 'Need the userid' }),
});

export const schemaEditHistory= z.object({
  letter: z.string().min(1, { message: 'Cannot be empty' }),
  name: z.string().min(1,{ message: 'need the name' }),
});

export const SchemaRegister = z.object({
  mail: z.string().email().min(1, { message: 'Need an email' }),
  password: z.string().min(8, { message: 'At least 8 characters long' })
    .regex(/[A-Za-z]/, { message: 'Must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'At least one special character' }),
  passwordConfirm: z.string()
    .min(8, { message: 'At least 8 characters long' })
    .regex(/[A-Za-z]/, { message: 'Must contain at least one letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'At least one special character' })
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"], 
});
export const newsletterSignUpSchema = z.object({
  email: z.string().email().min(1, { message: 'Need an email' }),
  
});
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// const fileSchema = z.instanceof(File)
//   .refine(file => file.size > 0, "File is required")
//   .refine(file => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
//   .refine(file => ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type), "Only .pdf, .docx formats are supported.").optional().nullable();


export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    , lastName: z
    .string()
    .min(2, {
      message: "Last Name must be at least 2 characters.",
    })
    ,
  email: z
    .string({
      required_error: "Please enter a email",
    })
    .email({message:"Need a valid email"}),
  dob: z.date({
    message: "A date of birth is required.",
  }).optional(),
  photo:z.any().optional()
})


export type NewsletterSignUpFormInput = z.infer<typeof newsletterSignUpSchema>;


export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface NavItemFooter {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}











// types.ts
export interface SectionStyle {
  background_color: string;
  text_color: string;
  texture: string;
  line_count: {
      min: number;
      max: number;
  };
}

export interface DocumentSection {
  title: string;
  guidelines: string;
  style: SectionStyle;
}

export interface DocumentData {
  sections: DocumentSection[];
}





const questionSchema = z.object({
  title: z.string(),
  value:z.coerce.string().default('no answer choose'),
  description: z.string(),
  inputType: z.enum(["string", "number", "radio", "rating","textarea","select"]),
  options: z.array(z.string()).optional(),
  possibilities: z.array(z.coerce.string()).optional(),
  correctAnswer: z.coerce.string().optional(),
});


const section = z.object({
  type: z.string(),
  guidelines: z.string().min(1,{message:'Need a description for the question'}),

  min_line: z.coerce.number({message:'need to be a minimun'}).min(1,{message:"need a minimun"}) ,
  max_line: z.coerce.number({message:'need to be a maximunn'}).min(1,{message:"need maximun"}),
  
});

const section2 = z.object({
  type: z.string(),
  guidelines: z.string().min(1,{message:'Need a description for the question'}),

  min_line: z.coerce.number({message:'need to be a minimun'}).min(1,{message:"need a minimun"}) ,
  max_line: z.coerce.number({message:'need to be a maximunn'}).min(1,{message:"need maximun"}),
  
});

export const modelLetter= z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  sections: z.array(section),
});

// export const resultSchema = z.object({
//   id: z.string(),
//   score: z.number(),
//   time: z.date(),
//   answer: z.record(z.any()), 
//   quizzId: z.string(),
//   userId: z.string(),
//   Quizz: quizSchema.nullable(),
//   user: z.any(),
// });



export const ApplyHistory = z.object({
  id: z.string().min(1,{message:"need the id"}),
  letter: z.string().min(1,{message:"need the letter"}),
  name: z.string().min(1,{message:"need the name"}),
  userId: z.string().min(1,{message:"need the user id"}),
  version: z.string().min(1,{message:"need the version"}),
  createdAt: z.date({message:"need the created AT"}),
  updatedAt: z.date({message:"need the updated AT"}),
})

export const newQuizzSchema = z.object({
  title: z.string().min(1,{message:'Need a title for the quizz'}),
  questions: z.array(section).min(1,"Need at least one question"),
  
});
export const edittemplateschema = z.object({
  name: z.string().min(1,{message:'Need a title for the quizz'}).optional(),
  description:z.string().min(1,{message:'Need a description for the quizz'}),

  sections: z.array(section).min(1,"Need at least one question"),
});

export const createtemplateschema = z.object({
  name: z.string().min(1,{message:'Need a title for the quizz'}),
  description:z.string().min(1,{message:'Need a description for the quizz'}),
  sections: z.array(section2).min(1,"Need at least one question"),
});


export const sectionTemplate = {
  id:"section-add",
  type:"introduction" ,
  guidelines: "dddddd", 
  max_line: 6,
  min_line: 1

};


export const defaultLetterTemplate = {
  name: "Default Cover Letter",
  description: "This is a standard cover letter template with structured sections.",
  sections: JSON.stringify([
    {
      type: "header",
      guidelines: "Include your name, address, telephone number, email, age, and driver's license category.",
      min_line: 1,
      max_line: 2,
    },
    {
      type: "object",
      guidelines: "State the job title or position number you are applying for.",
      min_line: 1,
      max_line: 2,
    },
    {
      type: "salutation",
      guidelines: "Address the recipient appropriately using their name if known.",
      min_line: 1,
      max_line: 2,
    },
    {
      type: "introduction",
      guidelines: "Write an introductory sentence that explains the purpose of the letter.",
      min_line: 1,
      max_line: 3,
    },
    {
      type: "company",
      guidelines: "Include a paragraph about the company to show your knowledge or interest.",
      min_line: 2,
      max_line: 5,
    },
    {
      type: "about_you",
      guidelines: "Describe your qualifications and why you are a good fit for the position.",
      min_line: 3,
      max_line: 10,
    },
    {
      type: "conclusion",
      guidelines: "Conclude by thanking the person and suggesting further contact.",
      min_line: 1,
      max_line: 3,
    },
    {
      type: "footer",
      guidelines: "End with your name and signature.",
      min_line: 1,
      max_line: 2,
    }
  ])
};

const experiencedJobApplicationSections = [
  { 
    type: "introduction",
    guidelines: "Briefly mention your current/most recent role , express strong interest in the position.",
    min_line: 1, 
    max_line: 3 
  },
  { 
    type: "body",
    guidelines: "Show you understand the company's mission/values and how your goals align, Highlight your most relevant achievements and how they'd benefit the company.",
    min_line: 6,  
    max_line: 17  
  },
  { 
    type: "conclusion",
    guidelines: "Reiterate your enthusiasm, mention enclosed resume,  express willingness for an interview.",
    min_line: 1, 
    max_line: 3 
  },
];

export const experiencedJobApplication = {
  name: "Experienced Job Application",
  description: "For professionals with significant experience.",
  sections: experiencedJobApplicationSections
};


const internshipApplicationSections = [
  {
    type: "introduction",
    guidelines: "Briefly introduce yourself, mention your school/program, and express your enthusiasm for the internship opportunity.",
    min_line: 1,
    max_line: 3
  },
  {
    type: "body",
    guidelines: "Highlight relevant coursework, projects, skills, or experiences that demonstrate your fit for the internship.  Showcase your eagerness to learn and contribute to the company.",
    min_line: 3,
    max_line: 10
  },
  {
    type: "conclusion",
    guidelines: "Thank the reader for their consideration, reiterate your interest, and mention your availability for an interview.",
    min_line: 1,
    max_line: 3
  },
];

export const internshipApplication = {
  name: "Internship Application",
  description: "Tailored for students or recent graduates seeking internships.",
  sections: internshipApplicationSections
};


const tailoredCoverLetterSections = [
  {
    type: "introduction",
    guidelines: "Briefly introduce yourself, express your enthusiasm for the specific position, and mention how you discovered the opportunity (e.g., job board, referral, company website).",
    min_line: 1,
    max_line: 3
  },
  {
    type: "body",
    guidelines: "Carefully review the job description and tailor your qualifications to directly address the specific requirements. Use keywords from the posting to highlight your most relevant skills, experiences, and achievements, Quantify your accomplishments whenever possible , Explain how your past successes demonstrate your ability to thrive in this role, Demonstrate your in-depth knowledge of the company, Mention specific aspects that resonate with you, such as: \n* Mission and values\n* Recent projects or accomplishments\n* , Company culture\n* Industry leadership\n ,Explain how your skills and career goals align with the company's vision and values,",
    min_line: 6,
    max_line: 17
  },
  {
    type: "conclusion",
    guidelines: "Reiterate your strong interest in the position and company. Express your eagerness to discuss how your unique qualifications can contribute to their success. Mention your attached resume and any relevant portfolio or work samples. Thank the reader for their time and consideration.",
    min_line: 1,
    max_line: 3
  },
];


export const targetedCoverLetter = {
  name: "Targeted Cover Letter",
  description: "Specifically focused on a company or job posting, showcasing your research and alignment.",
  sections: tailoredCoverLetterSections
};




const bussiness = {
  name: "Default Letter",
  description: "This is a default letter template with pre-defined sections.",
  sections: [
    {
      type: "introduction",
      guidelines: "Personal information,what/wher are you applying ? , Where are you applying ? ",
      min_line: 1,
      max_line: 3,
    },
    {
      type: "body",
      guidelines: "Story behind your achievement , Be as factual as possible , Show off your achievement usings metrics",
      min_line: 3,
      max_line: 10,
    },
    {
      type: "conclusion",
      guidelines: "Mention future plans , thank the reader and conclude ",
      min_line: 2,
      max_line: 6,
    }
  ]
};

export const mailbussiness = {
  name: "Bussiness Mail",
  description: "This is a default letter template with pre-defined sections.",
  sections: [
    {
      type: "introduction",
      guidelines: "say who you are ",
      min_line: 1,
      max_line: 3,
    },
    {
      type: "body",
      guidelines: "Why you reached out , What's in it for the recipient",
      min_line: 3,
      max_line: 10,
    },
    {
      type: "conclusion",
      guidelines: "Call to action",
      min_line: 1,
      max_line: 6,
    }
  ]
};


const spontaneousMotivationEmailSections = [
  {
    type: "introduction",
    guidelines: "Briefly introduce yourself, mention your profession or area of expertise, and express your admiration for the company's work, products, or values.",
    min_line: 1,
    max_line: 3
  },
  {
    type: "body",
    guidelines: "Highlight your most relevant skills, experiences, and achievements, focusing on those that align with the company's needs or industry. Explain how your background and expertise could be a valuable asset to the company. If applicable, mention any specific projects or initiatives that sparked your interest.",
    min_line: 3,
    max_line: 10
  },
  {
    type: "conclusion",
    guidelines: "Express your enthusiasm for the possibility of joining the company and contributing to its success. State your interest in discussing potential opportunities, even if there are no current openings. Offer to provide your resume or portfolio upon request. Thank the reader for their time and consideration.",
    min_line: 1,
    max_line: 3
  },
];

export const spontaneousMotivationEmail = {
  name: "Spontaneous Motivation Email",
  description: "For expressing interest in a company without a specific job posting.",
  sections: spontaneousMotivationEmailSections
};









export const configSchema = z.object({
  
    id: z.string(),
});



export const answerSchema = z.array(z.coerce.string());


export type modelLetterType = z.infer<typeof modelLetter>;
export type answerType = z.infer<typeof answerSchema>;
export type sectionType = z.infer<typeof section>;
export type newQuizzType = z.infer<typeof newQuizzSchema>;
export type EditModeType = z.infer<typeof edittemplateschema>;
export type ApplyHistoryType = z.infer<typeof ApplyHistory>;