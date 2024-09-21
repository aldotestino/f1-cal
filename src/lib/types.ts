// API Response

export interface ApiResponse {
  MRData: {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    RaceTable: {
      season: string
      Races: Array<{
        season: string
        round: string
        url: string
        raceName: string
        Circuit: {
          circuitId: string
          url: string
          circuitName: string
          Location: {
            lat: string
            long: string
            locality: string
            country: string
          }
        }
        date: string
        time: string
        FirstPractice: ApiSession
        SecondPractice: ApiSession
        ThirdPractice?: ApiSession
        Qualifying: ApiSession
        Sprint?: ApiSession
      }>
    }
  }
}

export interface ApiSession {
  date: string
  time: string
}

// Types

export interface Race {
  season: string
  round: string
  name: string
  circuit: Circuit
  sessions: Session[]
}

export interface Circuit {
  name: string
  country: string
  locality: string
  flag: string
}

export type SessionType = 'Free Practice 1' | 'Free Practice 2' | 'Free Practice 3' | 'Qualifying' | 'Sprint Qualifying' | 'Sprint' | 'Race'
export type SessionStatus = 'upcoming' | 'ongoing' | 'completed'

export interface Session {
  type: SessionType
  start: Date
  end: Date
  status: SessionStatus
}