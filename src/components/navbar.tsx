import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';
import { Search } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

function navbar({ 
  searchTerm, 
  setSearchTerm 
}: {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) {
  return (
    <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='max-w-screen-lg mx-auto p-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:items-center'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500'>f1-cal</h1>
        <div className='flex items-center gap-2 w-full sm:max-w-80'>
          <div className='flex items-center relative w-full'>
            <Search className='absolute left-2 w-4 h-4 text-muted-foreground' />
            <Input className='pl-8' placeholder="Cerca una gara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default navbar;