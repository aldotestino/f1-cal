'use client';

import { Race } from '@/lib/types';
import Navbar from '@/components/navbar';
import { useMemo, useState } from 'react';
import { searchFunction } from '@/lib/utils';

function Races({ races }: {races: Array<Race>}) {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRaces = useMemo(() =>  races.filter(r => searchFunction(r, searchTerm)), [races, searchTerm]);

  console.log(filteredRaces);

  return (
    <main className='min-h-screen'>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <pre>
        {JSON.stringify(filteredRaces, null, 2)}
      </pre>
    </main>
  );
}

export default Races;