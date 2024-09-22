'use client';

import { Race } from '@/lib/types';
import Navbar from '@/components/navbar';
import { useMemo, useState } from 'react';
import { searchFunction } from '@/lib/utils';
import RaceCard from './race-card';
import { Button } from './ui/button';

function Races({ races }: {races: Array<Race>}) {

  const [searchTerm, setSearchTerm] = useState('');
  const filteredRaces = useMemo(() =>  races.filter(r => searchFunction(r, searchTerm)), [races, searchTerm]);

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className='p-4 pb-10 w-full max-w-screen-lg mx-auto space-y-6'>
        {filteredRaces.length > 0 ? filteredRaces.map(r => (
          <RaceCard key={r.name} {...r} />
        )) :
          <div className='flex flex-col items-center'>
            <p className='text-center text-muted-foreground text-lg font-semibold'>Nessuna gara trovata</p>
            <Button size="sm" variant="link" onClick={() => setSearchTerm('')}>Cancella filtro</Button>
          </div>
        }
      </main>
    </>
  );
}

export default Races;