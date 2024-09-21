import { Session } from '@/lib/types';
import { format } from 'date-fns';

function SessionItem({ type, start }: Session) {

  return (
    <li className='flex items-center justify-between'>
      <div className='flex-1 flex items-center gap-4'>
        <div className='w-10 h-10 rounded-full bg-muted shrink-0' />
        <div className='flex flex-col'>
          <span className='font-semibold text-lg'>{type}</span>
          <span className='text-muted-foreground text-sm'>{format(start, 'PPPPp')}</span>
        </div>
      </div>
    </li>
  );
}

export default SessionItem;