import { create } from 'zustand';

type NumberStore = {
  currentNumber: number;
  setCurrentNumber: (newNumber: number) => void;
  hasAnimationPlayed: boolean;
  setHasAnimationPlayed: (played: boolean) => void;
  hasSecondAnimationPlayed: boolean;
  setHasSecondAnimationPlayed: (played: boolean) => void;
  hasThirdAnimationPlayed: boolean;
  setHasThirdAnimationPlayed: (played: boolean) => void;
};

export const useNumberStore = create<NumberStore>((set, get) => ({
  currentNumber: 1,
  setCurrentNumber: (newNumber) => {
    if (newNumber !== get().currentNumber) {
      set({ currentNumber: newNumber });
    }
  },
  hasAnimationPlayed: false,
  setHasAnimationPlayed: (played) => set({ hasAnimationPlayed: played }),
  hasSecondAnimationPlayed: false,
  setHasSecondAnimationPlayed: (played) => set({ hasSecondAnimationPlayed: played }),
  hasThirdAnimationPlayed: false,
  setHasThirdAnimationPlayed: (played) => set({ hasThirdAnimationPlayed: played }),
}));
