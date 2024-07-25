export type Event = {
  eventId: number;
  prize: bigint;
  question: string;
  countries: readonly string[];
  deadline: bigint;
  participants: readonly `0x${string}`[];
  winners: readonly `0x${string}`[];
  status: number;
};
