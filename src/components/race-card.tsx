import { Race } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { getFlagEmoji } from '@/lib/utils';
import { Button } from './ui/button';
import { CalendarPlus } from 'lucide-react';

function RaceCard({ name, circuit }: Race) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{getFlagEmoji(circuit.country)} {name}</CardTitle>
        <CardDescription>{circuit.name}, {circuit.country}, {circuit.locality}</CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className='justify-end'>
        <Button className='space-x-2 w-full sm:w-auto'>
          <CalendarPlus className='w-4 h-4'/>
          <span>Add to calendar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RaceCard;