export interface Kingdom {
  Id: number,
  Name: string,
  Area: number,
  Capital: string,
  Image: string,
  Description: string;
  State: string;
}

export interface KingdomWithTerm {
  Kingdom: Kingdom,
  From: Date,
  To: Date,
}