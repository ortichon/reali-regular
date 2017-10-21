import { Episode } from './episode.model';

export interface Series {
  id: number;
  title: string;
  image: string;
  episodes?: Episode[];
}
