import { ApiResponse, Race } from '@/lib/types';
import { createSessions, getFlagEmoji } from '@/lib/utils';

const API_URL = 'https://ergast.com/api/f1/current.json';

export async function getRaces() {
  const now = new Date();

  const res = await fetch(API_URL);
  const data: ApiResponse = await res.json();
  const { Races } = data.MRData.RaceTable;

  const races = Races.map(r => {

    return {
      season: r.season,
      round: r.round,
      name: r.raceName,
      circuit: {
        name: r.Circuit.circuitName,
        country: r.Circuit.Location.country,
        locality: r.Circuit.Location.locality,
        flag: getFlagEmoji(r.Circuit.Location.country)
      },
      sessions: createSessions({ r, now })
    } as Race;
  });

  return races.filter(r => r.sessions.some(s => s.start > now));
}