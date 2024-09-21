import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApiResponse, Race, Session, SessionType } from './types';
import { countryCodes, sessionDurations } from './data';
import { addMinutes } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function searchFunction(race: Race, searchTerm: string) {
  return race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    race.circuit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    race.circuit.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    race.circuit.locality.toLowerCase().includes(searchTerm.toLowerCase());
}

export function getFlagEmoji(country: string) {
  const countryCode = countryCodes[country];
  console.log(countryCode, country);
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function createSessions({
  r,
  now
}: {
  r: ApiResponse['MRData']['RaceTable']['Races'][number],
  now: Date
}) {
  const sessions: Array<Session> = [];

  sessions.push(createSession({
    type: 'Free Practice 1',
    date: r.FirstPractice.date,
    time: r.FirstPractice.time,
    now
  }));

  if (r.Sprint) {
    sessions.push(createSession({
      type: 'Sprint Qualifying',
      date: r.SecondPractice.date,
      time: r.SecondPractice.time,
      now
    }));

    sessions.push(createSession({
      type: 'Sprint',
      date: r.Sprint.date,
      time: r.Sprint.time,
      now
    }));
  } else {
    sessions.push(createSession({
      type: 'Free Practice 2',
      date: r.SecondPractice.date,
      time: r.SecondPractice.time,
      now
    }));

    if (r.ThirdPractice) {
      sessions.push(createSession({
        type: 'Free Practice 3',
        date: r.ThirdPractice.date,
        time: r.ThirdPractice.time,
        now
      }));
    }
  }

  sessions.push(createSession({
    type: 'Qualifying',
    date: r.Qualifying.date,
    time: r.Qualifying.time,
    now
  }));

  sessions.push(createSession({
    type: 'Race',
    date: r.date,
    time: r.time,
    now
  }));

  return sessions;
}

function createSession({
  type,
  date,
  time,
  now
}: {
  type: SessionType
  date: string
  time: string
  now: Date
}): Session {
  const start = new Date(`${date}T${time}`);
  const end = addMinutes(start, sessionDurations[type]);

  return {
    type,
    start,
    end,
    status: now < start ? 'upcoming' : now < end ? 'ongoing' : 'completed'
  };
}