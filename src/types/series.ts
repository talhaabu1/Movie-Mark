type Series = {
  id: number;
  name: string;
  season: number;
  episode: number;
  status: string;
  userId: number;
  createdAt: Date;
};

type SeriesCreateInput = Pick<
  Series,
  'name' | 'season' | 'episode' | 'status' | 'userId'
>;

type SeriesUpdateInput = Partial<SeriesCreateInput>;

export type { Series, SeriesCreateInput, SeriesUpdateInput };
