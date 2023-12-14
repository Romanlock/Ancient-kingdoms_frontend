import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Kingdom } from "../../dataStrucrures/KingdomInterface";

interface Props {
  kingdoms: Kingdom[];
}

const KingdomItem: React.FC<Props> = ({kingdoms}) => {
  const navigate = useNavigate();

  const kingdomDeleteFunc = () => {
    console.log('delete');
  }

  return (
    <Container className="feed-kingdoms">
      <Row style={{justifyContent: 'center'}}>
        {kingdoms?.map((kingdom, index) => (
          <Col xs={12} sm={6} md={4} lg={2} 
          className={`feed-kingdom feed-kingdom__kingdom-${kingdom.ID} m-1 p-1`} 
          onClick={() => navigate(`/kingdom/${kingdom.ID}`)}
          key={index}>
            <div className="feed-kingdom__kingdom_title">
              <div className="feed-kingdom__kingdom_title-text text-h2-medium">{kingdom.Name}</div>
            </div>
            <div className="feed-kingdom__kingdom_img p-1">
              <img src={kingdom.Image} alt={kingdom.Name} className="w-100" />
            </div>
            <div className="feed-kingdom__kingdom_btns">
              <Row>
                {/* <Col className="justify-content-between" style={{display: 'flex'}}>
                  <Link 
                  style={{width: '30%'}}
                  to={`/kingdom/${kingdom.ID}`}>
                    <Button
                      style={{width: '100%'}}>
                      Подробнее
                    </Button>
                  </Link>
                  <Button 
                    style={{width: '30%'}}
                    onClick={kingdomDeleteFunc}>
                    Удалить
                  </Button>
                </Col> */}
                <Col>
                  <Button 
                    onClick={e => {
                      e.stopPropagation();
                      kingdomDeleteFunc();
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
