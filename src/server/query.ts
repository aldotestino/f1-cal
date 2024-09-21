import { ApiResponse, Session } from '@/lib/types';

const API_URL = 'https://ergast.com/api/f1/current.json';

export async function getRaces() {
  const now = new Date();

  const res = await fetch(API_URL);
  const data: ApiResponse = await res.json();
  const { Races } = data.MRData.RaceTable;

  const races = Races.map(r => {

    const sessions: Array<Session> = [];

    sessions.push({
      name: 'Free Practice 1',
      datetime: new Date(`${r.FirstPractice.date}T${r.FirstPractice.time}`)
    });

    if (r.Sprint) {
      sessions.push({
        name: 'Sprint Qualifying',
        datetime: new Date(`${r.SecondPractice.date}T${r.SecondPractice.time}`)
      });

      sessions.push({
        name: 'Sprint',
        datetime: new Date(`${r.Sprint.date}T${r.Sprint.time}`)
      });
    } else {
      sessions.push({
        name: 'Free Practice 2',
        datetime: new Date(`${r.SecondPractice.date}T${r.SecondPractice.time}`)
      });

      if (r.ThirdPractice) {
        sessions.push({
          name: 'Free Practice 3',
          datetime: new Date(`${r.ThirdPractice.date}T${r.ThirdPractice.time}`)
        });
      }
    }

    sessions.push({
      name: 'Qualifying',
      datetime: new Date(`${r.Qualifying.date}T${r.Qualifying.time}`)
    });

    sessions.push({
      name: 'Race',
      datetime: new Date(`${r.date}T${r.time}`)
    });

    return {
      season: r.season,
      round: r.round,
      name: r.raceName,
      circuit: {
        name: r.Circuit.circuitName,
        country: r.Circuit.Location.country,
        locality: r.Circuit.Location.locality
      },
      sessions
    };
  });

  return races.filter(r => r.sessions.some(s => s!.datetime > now));
}