package ds

type GetKingdomsRequest struct {
	Ruler string
	State string
}

type GetRulersRequest struct {
	Num   int
	State string
}

type RulerStateChangeRequest struct {
	ID    int
	State string
	User  string
}
