export interface Story {
  id: number;
  title: string;
  by: string;
  url: string;
  text?: string;
  time?: string;
  kids: [];
}
