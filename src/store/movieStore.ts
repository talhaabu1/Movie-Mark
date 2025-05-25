import { create } from 'zustand';

type MovieStore = {
  status: string;
  page: number;
  setPage: (page: number) => void;
  setStatus: (status: string) => void;
};

export const useMovieStore = create<MovieStore>((set) => ({
  status: 'ALL',
  page: 1,
  setPage: (page) => set({ page }),
  setStatus: (status) => set({ status }),
}));
