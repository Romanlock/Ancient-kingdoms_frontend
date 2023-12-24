import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Image, Col } from 'react-bootstrap';
import { KingdomsApi } from "../../utils/api/KingdomsApi/KingdomsApi";
import { Kingdom } from "../../dataStructures/KingdomInterface";

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
          <Container>
            <Row style={{ justifyContent: 'center' }}>
              <Col xs={4}>
                <Image src={kingdom.Image} alt={kingdom.Name} style={{ width: '100%' }} rounded />
              </Col>
              <Col xs={4}>
                <Form>
                  <Form.Group className="mb-3" controlId="kingdomArea">
                    <Form.Label>Площадь</Form.Label>
                    <Form.Control type="text" disabled = {true} value={kingdom.Area} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomCapital">
                    <Form.Label>Столица</Form.Label>
                    <Form.Control type="text" disabled = {true} value={kingdom.Capital} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomDescription">
                    <Form.Label>О княжестве</Form.Label>
                    <Form.Control as="textarea" rows={3} type="text" disabled = {true} value={kingdom.Description} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="kingdomState">
                    <Form.Label>Статус</Form.Label>
                    <Form.Control type="text" disabled = {true} value={kingdom.State} />
                  </Form.Group>
                  <Button 
                    onClick={() => console.log('asdf')}>
                      Захватить 
                    </Button>
                </Form>
              </Col>
            </Row>
          </Container>
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
