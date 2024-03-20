import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Profile = {
  info: string;
};

type State = {
  token: string;
  profile: Profile;
  isAuth: boolean;
  isAdmin: boolean;
};

type Actions = {
  setToken: (token: string) => void;
  setProfile: (profile: Profile) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: '',
      profile: {},
      isAuth: false,
      isAdmin: false,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: true,
          isAdmin: true,
        })),
      setProfile: (profile: Profile) => set(() => ({ profile })),
      logout: () =>
        set(() => ({
          token: '',
          profile: {},
          isAuth: false,
          isAdmin: false,
        })),
    }),
    {
      name: 'auth',
    },
  ),
);
