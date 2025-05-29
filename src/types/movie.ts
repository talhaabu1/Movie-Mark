type Movie = {
  id: number;
  name: string;
  part: number;
  status: string;
  userId: number;
  createdAt: Date;
};

type MovieCreateInput = Pick<Movie, 'name' | 'part' | 'status' | 'userId'>;

type MovieUpdateInput = Partial<MovieCreateInput>;

export type { Movie, MovieCreateInput, MovieUpdateInput };
