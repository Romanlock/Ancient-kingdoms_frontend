import React, { useState, useEffect } from 'react';
import KingdomItem from '../../components/KingdomItem/KingdomItem';
import { KingdomsApi } from '../../utils/api/KingdomsApi/KingdomsApi'
import { Kingdom } from '../../dataStructures/KingdomInterface';
import { InputGroup, Form } from 'react-bootstrap';
import { AuthorizationApi } from '../../utils/api/AuthorizationApi/AuthorizationApi';

const KingdomsFeed: React.FC = () => {
  const authorizationApi = new AuthorizationApi();
  const kingdomsApi = new KingdomsApi();
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [searchKingdom, setSearchKingdom] = useState('');

  useEffect(() => {
    let kingdomName = searchKingdom ? searchKingdom : '';

    const getKingdoms = async () => {
      let data = await kingdomsApi.getKingdomsByName(kingdomName);
      
      setKingdoms(data);
    }

    getKingdoms();

    // const checkLogin = async () => {
    //   const data = await authorizationApi.checkLogin();
    //   console.log(data);
    // }

    // checkLogin();

  }, [searchKingdom]);

  return (
    <div className="page">
      <div className="content">
        <InputGroup className="mt-5">
        <Form.Control
          placeholder="Введите название королевства"
          aria-label="Username"
          value={searchKingdom}
          onChange={e => setSearchKingdom(e.target.value)}
        />
        </InputGroup>
        <KingdomItem kingdoms={kingdoms} />
      </div>
    </div>
  );
}

export default KingdomsFeed;
