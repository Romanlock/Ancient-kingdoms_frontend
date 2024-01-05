import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Row, Container, Col, Button } from 'react-bootstrap';

import KingdomItem from '../../components/KingdomItem/KingdomItem';
import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";
import Loader from '../../components/UI/Loader/Loader';
import { useKingdom } from '../../hooks/useKingdom';
import MyModal from '../../components/UI/Modal/Modal';
import { useApp } from '../../hooks/useApp';
import { errorMatching } from '../../utils/errorMatching/errorMatching';


const KingdomsFeed: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const [isLoaded, setIsLoaded] = useState(false); 

  const [searchText, setSearchText] = useState('');

  const { kingdoms, setKingdoms } = useKingdom();

  const { setCurrentPage, deleteCurrentPage } = useApp();

  useEffect(() => {
    setCurrentPage('Список княжеств');
  }, [])

  useEffect(() => {
    setKingdoms(searchText)
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки:');
          setModalError(errorMatching(result.response?.Message!));
          setModalVariant('');
          setModalCanselText('Закрыть');
          setModalShow(true);

          setIsLoaded(true);

          return;
        }
        
        setIsLoaded(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки:');
        setModalError(errorMatching(error));
        setModalVariant('');
        setModalCanselText('Закрыть');
        setModalShow(true);

        setIsLoaded(true);
      });
          
    return () => {
      deleteCurrentPage();
    }
  }, [searchText]);

  if (!isLoaded) {
    return <Loader />;
  }

  if (modalShow) {
    return (
      <MyModal 
        title={modalTitle}
        text={modalText}
        error={modalError}
        show={modalShow}
        variant={modalVariant}
        canselText={modalCanselText}
        saveText={modalSaveText}
        onHide={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="kingdom-page">
      <div className="page">
        <div className="content">
          <InputGroup className="kingdom-page__search">
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
    </div>   
  );
}

export default KingdomsFeed;
