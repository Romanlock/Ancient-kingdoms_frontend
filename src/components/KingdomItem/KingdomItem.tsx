import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Kingdom } from "../../dataStructures/KingdomInterface";

interface Props {
  kingdoms: Kingdom[],
  addKingdomToApplication: Function
}

const KingdomItem: React.FC<Props> = ({kingdoms, addKingdomToApplication}) => {

  const dispatch = useDispatch();
  const { currentApplication } = useSelector((store: any) => store.application);

  const navigate = useNavigate();

  // useEffect(() => {

  // })

  return (
    <Container className="feed-kingdoms">
      <Row style={{justifyContent: 'center'}}>
        {kingdoms?.map((kingdom, index) => (
          <Col xs={12} sm={8} md={4} lg={3} 
          className={`feed-kingdom feed-kingdom__kingdom-${kingdom.Id} m-1 p-1`} 
          onClick={() => navigate(`/kingdom/${kingdom.Id}`)}
          key={index}>
            <div className="feed-kingdom__kingdom_title">
              <div className="feed-kingdom__kingdom_title-text text-h2-medium" style={{textAlign: 'center'}}>{kingdom.Name}</div>
            </div>
            <div className="feed-kingdom__kingdom_img p-1">
              <img src={kingdom.Image} alt={kingdom.Name} className="w-100" />
            </div>
            <div className="feed-kingdom__kingdom_btns">
              <Row>
                <Col>
                  <Button 
                    onClick={e => {
                      e.stopPropagation();
                      addKingdomToApplication(kingdom.Id);
                    }}>
                    Захватить
                  </Button>
                </Col>
              </Row>                
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default KingdomItem;
