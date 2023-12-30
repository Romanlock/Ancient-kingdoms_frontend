import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Row, Container, Col, Button } from 'react-bootstrap';

import KingdomItem from '../../components/KingdomItem/KingdomItem';
import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";
import Loader from '../../components/UI/Loader/Loader';
import { useKingdom } from '../../hooks/useKingdom';
import MyModal from '../../components/UI/Modal/Modal';


const KingdomsFeed: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false); 
  const [searchText, setSearchText] = useState('');

  const { kingdoms, setKingdoms } = useKingdom();

  useEffect(() => {
    setKingdoms(searchText)
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
          

  }, [searchText]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="kingdom-page">
      { modalShow ? (
        <MyModal 
          title={'Не найдены княжества'}
          text={'Детали ошибки:'}
          error={modalText}
          show={true}
          onHide={() => window.location.reload()}
        />
      ) : (
        <div className="page">
          <div className="content">
            <InputGroup className="mt-5">
            <Form.Control
              placeholder="Введите название королевства"
              aria-label="Username"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            </InputGroup>

            <Container className="feed-kingdoms">
              <Row style={{justifyContent: 'center'}}>
                {kingdoms?.map((kingdom: Kingdom) => (
                  <KingdomItem 
                  key={kingdom.Id}
                  kingdom={kingdom}
                  inApplication={false}
                  applicationDateFrom={null}
                  applicationDateTo={null}
                  disabled={false}
                  />              
                ))}
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>   
  );
}

export default KingdomsFeed;
