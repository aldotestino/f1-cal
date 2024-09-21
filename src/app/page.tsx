import Races from '@/components/races';
import { getRaces } from '@/server/query';

async function Home() {

  const races = await getRaces();

  if(!races) {
    return <div>Loading...</div>;
  }

  return (
    <Races races={races} />
  );
}

export default Home;