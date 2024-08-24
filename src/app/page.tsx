import Navbar from '@/components/Navbar';
import WordleGame from '@/components/WordleGame';

export default function Home() {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center ">
            <WordleGame />
        </main>
    </div>
  
  );
}

