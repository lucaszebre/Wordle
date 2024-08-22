"use client"

import {  modelLetterType } from "@/types"

import SectionComponent from "./sectionComponent"


export default function viewTemplate(props:{model:modelLetterType}) {

  return (
    <div className="w-full relative p-4">
      <p>{props.model.description}</p>
      {props.model.sections.map((section, index) => (
        <SectionComponent key={index} section={section} />
      ))}
    </div>
  )
}