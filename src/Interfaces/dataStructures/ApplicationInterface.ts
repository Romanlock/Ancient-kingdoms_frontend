import { User } from "./UserInterface";
import { KingdomWithTerm } from "./KingdomInterface";

export interface Application {
  Id: number | null,
  State: string, 
  DateCreate: Date,
  DateSend: Date,
  DateComplete: Date,
  Ruler: string,
  Creator: User,
  CreatorId: number,
  Moderator: User,
  ModeratorId: number,
  Check: boolean,
  KingdomsWithTerm: KingdomWithTerm[],
}
