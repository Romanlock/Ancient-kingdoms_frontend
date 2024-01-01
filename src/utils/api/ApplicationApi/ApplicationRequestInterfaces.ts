export interface ApplicationStatusRequest {
  Id: Number,
  State: string,
}

export interface AddKingdomToApplicationRequest {
  ApplicationId: Number,
  KingdomId: Number,
  From: Date,
  To: Date,
}

export interface DeleteKingdomFromApplicationRequest {
  ApplicationId: Number,
  KingdomId: Number,
}

export interface CreateApplicationAndAddKingdom {
  KingdomId: Number,
  From: Date,
  To: Date,
}
