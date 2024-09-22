import { Race } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { CalendarPlus } from 'lucide-react';
import SessionItem from './session-item';
import { createEvents } from 'ics';
import { createDateTime } from '@/lib/utils';

function RaceCard({ name, circuit, sessions }: Race) {

  function handleAddToCalendar() {
    const event = createEvents(sessions
      .filter(s => s.status === 'upcoming')
      .map(s => ({
        title: `${name} - ${s.type}`,
        start: createDateTime(s.start),
        end: createDateTime(s.end),
      })));

    if(event.value) {
      const blob = new Blob([event.value], { type: 'text/calendar' });
      const icsUrl = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = icsUrl;
      link.download = `${name}.ics`;
      link.click();
      URL.revokeObjectURL(icsUrl);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{circuit.flag}{' '}{name}</CardTitle>
        <CardDescription>{circuit.name}, {circuit.country}, {circuit.locality}</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className='grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2'>
          {sessions.map(s => (
            <SessionItem key={`${name}_${s.type}`} session={s} raceName={name} />
          ))}
        </ol>
      </CardContent>
      <CardFooter className='justify-end'>
        <Button className='space-x-2 w-full sm:w-auto' onClick={handleAddToCalendar}>
          <CalendarPlus className='w-4 h-4'/>
          <span>Aggiungi tutte le sessioni</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RaceCard;