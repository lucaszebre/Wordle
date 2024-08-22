import React from 'react'
import '../../globals.css'
import { Nav } from '@/components/landingpage/Nav'
import { HeroSection } from '@/components/landingpage/Hero'
import { BenefitsSection } from '@/components/layout/sections/benefits'
import { FAQSection } from '@/components/layout/sections/faq'
import { PricingSection } from '@/components/layout/sections/pricing'
import { FooterSection } from '@/components/layout/sections/footer'
const page = () => {
  return (
    <>
      <Nav />
      <HeroSection />
      <BenefitsSection order={1} title={'Upload your CV'} desc={'Import your professional experience with a single click'} video={'/ADDCV.mp4'} />
      <BenefitsSection order={2} title={'Choose your template'} desc={'Select from our range of professional designs.'} video={'/template.mp4'} />
      <BenefitsSection order={3} title={'Personalize your letter'} desc={'Add specific details for each job application.'} video={'/details.mp4'} />
      <BenefitsSection order={4} title={'Generate your letter'} desc={'Our AI creates a tailored cover letter in seconds.'} video={'/generate.mp4'} />
      <BenefitsSection order={5} title={'Refine your text'} desc={'Edit and polish your letter with AI assistance.'} video={'/refine.mp4'} />
      <BenefitsSection order={6} title={'Regenerate if needed'} desc={'Not satisfied? Create a new version instantly.'} video={'/regenerate.mp4'} />
      <PricingSection />
      <FAQSection />
      <FooterSection />

    </>
  )
}

export default page