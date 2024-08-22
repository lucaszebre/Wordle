import { prisma } from "@/config/db";

export async function saveData(user: any, datad: any, letter: string, template: any, companyInfo: any, analysis: any,log:any) {
    'use server'
    
    if (letter && user) {
      const historyEntry = await prisma.applyHistory.create({
        data: {
          id:datad.id,
          Cv: datad.cv.content,
          jobsInfo: datad.jobDescription,
          extraInfo: datad.extraInfo,
          CompanyInfo: datad.companyCulture,
          template: template.sections,
          userId: user.id,
          letter: letter,
          version: '0',
          name: datad.name,
          company: companyInfo.name,
          description: companyInfo.description,
          analysis,
          log
        }
      });
      // console.log('Data saved successfully:', historyEntry);
      return { success: true, historyEntry };
    } else {
       throw new Error('No Letter was created or user not found');
    }
  }
  