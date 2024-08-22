'use server';

import OpenAI from "openai";

export async function editTextIA(action: string, text: string) {


  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  });

  const prompt = `
You are an expert text editor . Your task is to modify the following text according to the provided action. Here are the details:

Original Text:
"""
${text}
"""

Action to perform:
${action}

Instructions:
1. Apply the specified action to the original text THOROUGHLY.


Your response MUST be a JSON object with a single key "text" containing the modified text. Do not include any explanations or additional formatting. The JSON should look like this: {"text": "modified text here"}

IMPORTANT: If you don't make significant changes to the text, you have FAILED the task. Be bold and creative!
`;

  try {
    console.log('Sending request to OpenAI');
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a brilliant and daring text editor. When asked to modify text, especially to add humor or change tone, you make bold, creative changes that significantly alter the text while preserving its core message." 
        },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.8,
    });

    const answer = completion.choices[0].message.content;
    // console.log('Received response from OpenAI:', answer);

    if (!answer) {
      throw new Error('No response from OpenAI');
    }

    // Parse JSON response
    const jsonObj = JSON.parse(answer);
    // console.log('Parsed JSON object:', jsonObj);

    // Validate the response
    if (!jsonObj.text || typeof jsonObj.text !== 'string') {
      throw new Error('Invalid response format');
    }

    // Verify that significant changes were made
    if (jsonObj.text === text || (jsonObj.text.length / text.length < 1.1 && jsonObj.text.length / text.length > 0.9)) {
      // console.log('No significant changes detected, retrying...');
      return editTextIA(action, text); // Recursive call to try again
    }

    // console.log('Returning modified text:', jsonObj.text);
    return jsonObj.text;
  } catch (error) {
    // console.error('Error in continueConversation:', error);
    // console.log('Returning original text due to error');
    return text;
  }
}