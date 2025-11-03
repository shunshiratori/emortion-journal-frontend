export type LoginResponse = { token: string; username: string };
export type MoodEntry = {
  id: number;
  userId: number;
  entryDate: string;
  moodLevel: number;
  memo?: string | null;
};
