import { Session } from '@/lib/types';
import { Button } from './ui/button';
import { Calendar, CalendarPlus, Timer, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

function SessionItem({ type, start, status }: Session) {

  return (
    <li className='flex items-center justify-between gap-4'>
      <div className='flex-1 flex items-center gap-4'>
        <div className={cn('w-10 h-10 rounded-full bg-transparent shrink-0 grid place-items-center border-2 border-dashed', status === 'upcoming' ? 'border-blue-500' : status === 'ongoing' ? 'border-yellow-500' : 'border-green-500')}>
          {status === 'upcoming' ? <Calendar className='w-4 h-4 text-blue-500' /> : status === 'ongoing' ? <Timer className='w-4 h-4 text-yellow-500' /> : <Check className='w-4 h-4 text-green-500' />}
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold text-lg'>{type}</span>
          <span className='text-muted-foreground text-sm'>{format(start, 'PPPPp')}</span>
        </div>
      </div>
      {status === 'upcoming' && <Button size="icon" variant="outline">
        <CalendarPlus className='w-4 h-4' />
      </Button>}
    </li>
  );
}

export default SessionItem;