import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Image, Col } from 'react-bootstrap';

import { useKingdom } from '../../hooks/useKingdom';
import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/Modal/Modal";


const KingdomPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false); 
 
  const { kingdom, setKingdom, deleteKingdom } = useKingdom();
  

  useEffect(() => {
    if (!/^\d+$/.test(id!)) {
      setModalText('Неверный формат княжества');
      setModalShow(true);
      setIsLoaded(true)
    } else {
      setKingdom(+id!)
        .then(result => {
          if (!result.result) {
            setModalText(result.response?.Message!);
            setModalShow(true);
          }
          
          setIsLoaded(true);
        })
        .catch(error => {
          setModalText(error);
          setModalShow(true);
          setIsLoaded(true);
        });
    }    

    return () => deleteKingdom();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }


  return (
    <div className="kingdom-page">
      { modalShow ? (
        <MyModal 
        title={'Не найдено княжество'}
        text={'Детали ошибки:'}
        error={modalText}
        show={true}
        onHide={() => { navigate('/kingdom') }}
      />
      ) : (
        <div>
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
      )}
    </div>
   );
}

export default KingdomPage;
