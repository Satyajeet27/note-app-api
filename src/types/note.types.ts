import { User } from "./user.types";

export interface Note {
  _id: string;
  user: User;
  description: string;
  tags: string[];
  title: string;
}
