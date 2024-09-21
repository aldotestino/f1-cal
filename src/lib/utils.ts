import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Race } from './types';
import { countryCodes } from './data';

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