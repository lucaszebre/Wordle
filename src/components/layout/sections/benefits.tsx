/* eslint-disable react-hooks/exhaustive-deps */
"use client"
    import React, { useEffect, useRef } from 'react';
    import { Card } from "@/components/ui/card";
    
    interface BenefitsProps {
      order: number;
      title: string;
      desc: string;
      video: string;
    }
    
    export const BenefitsSection: React.FC<BenefitsProps> = (props) => {
      const videoRef = useRef<HTMLVideoElement>(null);
    
      useEffect(() => {
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && videoRef.current) {
              videoRef.current.play();
            } else if (videoRef.current) {
              videoRef.current.pause();
            }
          });
        }, options);
    
        if (videoRef.current) {
          observer.observe(videoRef.current);
        }
    
        return () => {
          if (videoRef.current) {
            observer.unobserve(videoRef.current);
          }
        };
      }, []);
    
      return (
        <section id="benefits" className="container py-24 sm:py-32">
          <div className={`flex ${props.order % 2 != 0 ? 'flex-row' : 'flex-row-reverse'} justify-between items-center w-full lg:gap-24`}>
            <div className="w-1/2">
              <h2 className="text-lg text-primary mb-2 tracking-wider">Step {props.order}</h2>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{props.title}</h2>
              <p className="text-xl text-muted-foreground mb-8">{props.desc}</p>
            </div>
    
            <div className="w-1/2">
              <Card className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src={props.video} type="video/mp4" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </Card>
            </div>
          </div>
        </section>
      );
    };
  