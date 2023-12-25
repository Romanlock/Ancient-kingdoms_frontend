import { Kingdom } from "./KingdomInterface";
import { Application } from "./ApplicationInterface";


export interface Kingdom2Appliction {
  Id: number,
  Kingdom: Kingdom,
  KingdomId: number,
  Application: Application,
  ApplicationId: number,
  From: Date,
  To: Date,
}