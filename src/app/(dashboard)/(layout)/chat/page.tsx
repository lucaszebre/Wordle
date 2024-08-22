/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type CoreMessage } from 'ai';
import { useEffect, useState } from 'react';
import { continueConversation } from '../../../../components/chat/actions';
import { readStreamableValue } from 'ai/rsc';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Chat() {
  
  const { id } = useParams();
  const [letter, setLetter] = useState('');
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState('');
  const [data, setData] = useState<any>();

  const history =useQuery({
    queryFn: async () => {
      const  data = (await axios.get(`/api/history/${id}`))
      return data.data
    },
    queryKey: ['history'],
    refetchOnWindowFocus:true
        })

        if(history.isLoading){
          return <p>Loading...</p>
        }

        useEffect(()=>{
          setLetter(history.data.letter)
          
        },[history.isFetched])

       

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <div className='text-white font-bold'>
        {letter}
      </div>
      {/* {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content as string}
        </div>
      ))} */}

      <form
        onSubmit={async e => {
          e.preventDefault();
      

          const result = await continueConversation(input,letter);
          setLetter(result);
          setInput('');


        }}
      >
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}