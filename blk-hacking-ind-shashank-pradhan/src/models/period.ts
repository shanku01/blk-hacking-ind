// models/period.ts

export interface QPeriod {
  fixed: number;
  start: string;
  end: string;
}

export interface PPeriod {
  extra: number;
  start: string;
  end: string;
}

export interface KPeriod {
  start: string;
  end: string;
}

export interface Period {
  start: string;
  end: string;
  fixed?: number;
  extra?: number;
}