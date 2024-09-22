import Races from '@/components/races';
import { getRaces } from '@/server/query';

export const revalidate = 300; // 5 minutes

async function Home() {

  const races = await getRaces();

  if(races.length === 0) {
    return (
      <div className='h-screen grid place-items-center'>
        <p className='text-muted-foreground text-lg font-semibold'>Nessuna gara trovata</p>
      </div>
    );
  }

  return (
    <Races races={races} />
  );
}

export default Home;