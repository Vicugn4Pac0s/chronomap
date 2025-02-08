import { create } from "zustand";
import dayjs from "dayjs";

interface TimeState {
  time: string;
  updateTime: () => void;
}

const useTimeStore = create<TimeState>((set) => ({
  time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  updateTime: () => set({ time: dayjs().format('YYYY/MM/DD HH:mm:ss') }),
}));

export default useTimeStore;