import type { User } from "@/types/auth";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<User | null>("user", null);
