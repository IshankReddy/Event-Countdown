export interface Timer {
  id: string;
  title: string;
  targetDate: Date;
  color: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}