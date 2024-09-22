import { Session } from '@/lib/types';
import { Button } from './ui/button';
import { Calendar, CalendarPlus, Timer, Check } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { createEvent } from 'ics';
import { cn, createDateTime } from '@/lib/utils';

function SessionItem({ session, raceName }: {session: Session, raceName: string}) {

  function handleAddToCalendar() {
    const event = createEvent({
      title: `${raceName} - ${session.type}`,
      start: createDateTime(session.start),
      end: createDateTime(session.end),
    });

    if(event.value) {
      const blob = new Blob([event.value], { type: 'text/calendar' });
      const icsUrl = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = icsUrl;
      link.download = `${raceName}_${session.type}.ics`;
      link.click();
      URL.revokeObjectURL(icsUrl);
    }
  }

  return (
    <li className='flex items-center justify-between gap-4'>
      <div className='flex-1 flex items-center gap-4'>
        <div className={cn('w-10 h-10 rounded-full bg-transparent shrink-0 grid place-items-center border-2 border-dashed', session.status === 'upcoming' ? 'border-blue-500' : session.status === 'ongoing' ? 'border-yellow-500' : 'border-green-500')}>
          {session.status === 'upcoming' ? <Calendar className='w-6 h-6 text-blue-500' /> : session.status === 'ongoing' ? <Timer className='w-6 h-6 text-yellow-500' /> : <Check className='w-6 h-6 text-green-500' />}
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold text-lg'>{session.type}</span>
          <span className='text-muted-foreground text-sm capitalize'>{format(session.start, 'PPPPp', { locale: it })}</span>
        </div>
      </div>  
      {session.status === 'upcoming' && <Button size="icon" variant="outline" onClick={handleAddToCalendar}>
        <CalendarPlus className='w-4 h-4' />
      </Button>}
    </li>
  );
}

export default SessionItem;