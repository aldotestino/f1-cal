import { getRaces } from '@/server/query';

async function Home() {

  const races = await getRaces();

  console.log(races);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto grid place-items-center">
      <h1 className="text-4xl font-semibold">F1-cal</h1>
    </main>
  );
}

export default Home;