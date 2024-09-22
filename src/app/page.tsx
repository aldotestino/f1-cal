import Races from '@/components/races';
import { getRaces } from '@/server/query';

export const revalidate = 300; // 5 minutes

async function Home() {

  const races = await getRaces();

  return (
    <Races races={races} />
  );
}

export default Home;