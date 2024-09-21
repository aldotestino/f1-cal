'use client';

import { Race } from '@/lib/types';
import Navbar from '@/components/navbar';
import { useMemo, useState } from 'react';
import { searchFunction } from '@/lib/utils';
import RaceCard from './race-card';

function Races({ races }: {races: Array<Race>}) {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRaces = useMemo(() =>  races.filter(r => searchFunction(r, searchTerm)), [races, searchTerm]);

  return (
    <div className='min-h-screen'>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className='p-4 pt-10 w-full max-w-screen-lg mx-auto space-y-6'>
        {filteredRaces.map(r => (
          <RaceCard key={r.name} {...r} />
        ))}
      </main>
    </div>
  );
}

export default Races;