import { create } from 'zustand';

type SeriesStore = {
  status: string;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setStatus: (status: string) => void;
  setSearch: (search: string) => void;
};

export const useSeriesStore = create<SeriesStore>((set) => ({
  status: 'ALL',
  page: 1,
  search: '',
  setPage: (page) => set({ page }),
  setStatus: (status) => set({ status }),
  setSearch: (search) => set({ search }),
}));
