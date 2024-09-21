import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Race } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function searchFunction(race: Race, searchTerm: string) {
  return race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    race.circuit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    race.circuit.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    race.circuit.locality.toLowerCase().includes(searchTerm.toLowerCase());
}