import Spinner from '@/components/ui/spinner';

function Loading() {
  return (
    <main className='h-screen grid place-items-center'>
      <div className='flex flex-col items-center gap-2'>
        <Spinner className="text-muted-foreground h-8 w-8 text-red-500" />
        <p className='text-lg text-muted-foreground font-semibold'>Loading...</p>
      </div>
    </main>
  );
}

export default Loading;