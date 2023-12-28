import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Form, Row, Container, Col, Button } from 'react-bootstrap';

import KingdomItem from '../../components/KingdomItem/KingdomItem';
import { KingdomsApi } from '../../utils/api/KingdomsApi/KingdomsApi'
import { setKingdoms } from '../../stores/KingdomStore';
import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";
import Loader from '../../components/UI/Loader/Loader';


const KingdomsFeed: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false); // новое состояние
  const kingdomsApi = new KingdomsApi();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const { kingdoms } = useSelector((store: any) => store.kingdom);

  useEffect(() => {
    async function getAllKingdoms() {
      const loadedKingdoms = await kingdomsApi.getKingdomsByName(searchText);
      dispatch(setKingdoms(loadedKingdoms));
      setIsLoaded(true); // устанавливаем состояние в true после загрузки данных
    }
    getAllKingdoms();
  }, [dispatch, searchText]);

  if (!isLoaded) { // Проверяем и isLoaded и наличие данных kingdoms
    if (!isLoaded) {
      return <Loader />;
    }
  }

  return (
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
              />              
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default KingdomsFeed;
