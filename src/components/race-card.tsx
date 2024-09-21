import { Race } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { CalendarPlus } from 'lucide-react';
import SessionItem from './session-item';

function RaceCard({ name, circuit, sessions }: Race) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{circuit.flag}{' '}{name}</CardTitle>
        <CardDescription>{circuit.name}, {circuit.country}, {circuit.locality}</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className='grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2'>
          {sessions.map(s => (
            <SessionItem key={s.type} {...s} />
          ))}
        </ol>
      </CardContent>
      <CardFooter className='justify-end'>
        <Button className='space-x-2 w-full sm:w-auto'>
          <CalendarPlus className='w-4 h-4'/>
          <span>Add all events to calendar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RaceCard;