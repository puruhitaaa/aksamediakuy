import { atomWithStorage } from "jotai/utils";

type DarkModeState = "system" | "dark" | "light";

export const darkModeAtom = atomWithStorage<DarkModeState>(
  "darkMode",
  "system",
);
