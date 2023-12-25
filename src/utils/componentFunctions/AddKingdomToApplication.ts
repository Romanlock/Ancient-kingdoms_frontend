import { useDispatch, useSelector } from "react-redux";
import { CreateCurrentApplication, AddKingdomToApplication } from "../../stores/ApplicationStore";
import { Kingdom, KingdomWithTerm } from "../../Interfaces/dataStructures/KingdomInterface";

export const addKingdomToApplication = (from: Date | null, to: Date | null, kingdom: Kingdom) => {
  if (!from || !to) {
    return;
  }

  const kingdomWithTerm: KingdomWithTerm = {
    From: from,
    To: to,
    Kingdom: kingdom,
  }

  const dispatch = useDispatch();  
  dispatch(AddKingdomToApplication(kingdomWithTerm))
  
  console.log(kingdom);
}