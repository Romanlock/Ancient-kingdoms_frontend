import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { KingdomsApi } from "../../utils/api/KingdomsApi/KingdomsApi";
import { Kingdom } from "../../dataStrucrures/KingdomInterface";

const KingdomPage: React.FC = () => {
  const kingdomsApi = new KingdomsApi();
  const [kingdom, setKingdom] = useState<Kingdom | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getKingdomInfo = async () => {
      if (!id) {
        return;
      }
      const kingdom = await kingdomsApi.getKingdomByID(+id);
      setKingdom(kingdom);
    }

    getKingdomInfo();
  }, [id]);

  if (!kingdom) {
      return; 
  }

  return (
   <div className="kingdom-page">
       <div className="kingdom" style={{ marginTop: '56px'}}>
          <div className="kingdom__title">
            <h2>{kingdom.Name}</h2>
          </div>

          <Form>
            <Form.Group className="mb-3" controlId="kingdomArea">
              <Form.Label>Площадь</Form.Label>
              <Form.Control type="text" disabled = {true} value={kingdom.Area} />
            </Form.Group>
          </Form>
           <div className="kingdom__area">
               <h2></h2>
           </div>
           <div className="kingdom__capital">
               <h2>{kingdom.Capital}</h2>
           </div>
           <div className="kingdom__description">
               <h2>{kingdom.Description}</h2>
           </div>
           <div className="kingdom__img">
               <img src={kingdom.Image} alt={kingdom.Name} />
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
