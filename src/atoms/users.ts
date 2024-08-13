import type { User } from "@/types/auth";
import { atomWithStorage } from "jotai/utils";

const users = [
  {
    id: "2",
    username: "janedoe",
    email: "janedoe@gmail",
    fullName: "Jane Doe",
  },
  {
    id: "3",
    username: "testuser",
    email: "testuser@gmail",
    fullName: "Test User",
  },
  {
    id: "4",
    username: "testuser2",
    email: "testuser2@gmail",
    fullName: "Test User 2",
  },
  {
    id: "5",
    username: "testuser3",
    email: "testuser3@gmail",
    fullName: "Test User 3",
  },
  {
    id: "6",
    username: "testuser4",
    email: "testuser4@gmail",
    fullName: "Test User 4",
  },
  {
    id: "7",
    username: "testuser5",
    email: "testuser5@gmail",
    fullName: "Test User 5",
  },
  {
    id: "8",
    username: "testuser6",
    email: "testuser6@gmail",
    fullName: "Test User 6",
  },
  {
    id: "9",
    username: "testuser7",
    email: "testuser7@gmail",
    fullName: "Test User 7",
  },
  {
    id: "10",
    username: "testuser8",
    email: "testuser8@gmail",
    fullName: "Test User 8",
  },
  {
    id: "11",
    username: "testuser9",
    email: "testuser9@gmail",
    fullName: "Test User 9",
  },
  {
    id: "12",
    username: "testuser10",
    email: "testuser10@gmail",
    fullName: "Test User 10",
  },
  {
    id: "13",
    username: "testuser11",
    email: "testuser11@gmail",
    fullName: "Test User 11",
  },
  {
    id: "14",
    username: "testuser12",
    email: "testuser12@gmail",
    fullName: "Test User 12",
  },
  {
    id: "15",
    username: "testuser13",
    email: "testuser13@gmail",
    fullName: "Test User 13",
  },
];

export const usersAtom = atomWithStorage<User[] | null>("users", users);
