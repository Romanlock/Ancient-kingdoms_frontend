import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { KingdomsApi } from "../../utils/api/KingdomsApi/KingdomsApi";
import { Kingdom } from "../../dataStrucrures/KingdomInterfase";

const KingdomPage: React.FC = () => {
  const kingdomsApi = new KingdomsApi();
  const [kingdom, setKingdom] = useState<Kingdom | null>(null);
  const { id } = useParams();

  useEffect(() => {
      kingdomsApi.getKingdomByID(+id!)
            .then((data: Kingdom) => {
                setKingdom({
                Id: data.Id,
                Name: data.Name,
                Area: data.Area,
                Capital: data.Capital,
                Image: data.Image,
                Description: data.Description,
                State: data.State,
                });          
            })
  }, [id]);

  if (!kingdom) {
      return null; 
  }

  return (
   <div className="kingdom-page">
       <div className="kingdom">
           <div className="kingdom__title">
               <h2>{kingdom.Name}</h2>
           </div>
           <div className="kingdom__area">
               <h2>{kingdom.Area}</h2>
           </div>
           <div className="kingdom__capital">
               <h2>{kingdom.Capital}</h2>
           </div>
           <div className="kingdom__description">
               <h2>{kingdom.Description}</h2>
           </div>
           <div className="kingdom__img">
               <img src={"data:image/jpg;base64, " + kingdom.Image} alt={kingdom.Name} />
           </div>
           <div className="kingdom__state">
               <h2>{kingdom.State}</h2>
           </div>
       </div>
       <div className="kingdom-page__btns">
           <Link to="/kingdom">
               <Button className="btn-primary kingdom-page__back-btn">На главную</Button>
           </Link>
       </div>
   </div>
   );
}

export default KingdomPage;
