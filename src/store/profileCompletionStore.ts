import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  profileCompletion: number;
  setProfileCompletion: (value: number) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profileCompletion: 0,
      setProfileCompletion: (value) => set({ profileCompletion: value }),
    }),
    {
      name: "profile-completion-storage", 
    }
  )
);
