import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Form } from 'react-bootstrap';
import KingdomItem from '../../components/KingdomItem/KingdomItem';
import { KingdomsApi } from '../../utils/api/KingdomsApi/KingdomsApi'
import { setKingdoms } from '../../stores/KingdomsSlice';
import { Kingdom } from '../../dataStructures/KingdomInterface';

interface PropsKingdomItemInterface {
  kingdoms: Kingdom[],
  addKingdomToApplication: Function
}



const KingdomsFeed: React.FC = () => {
  const kingdomsApi = new KingdomsApi();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const { kingdoms } = useSelector((store: any) => {
    return store.kingdom;
  });
  
  const addKingdomToApplication = (kingdomId: number) => {
    console.log(kingdomId);
  }

  const PropsKingdomItem: PropsKingdomItemInterface = {
    kingdoms,
    addKingdomToApplication,
  }

 

  useEffect(() => {
    async function getAllKingdoms() {
      dispatch(setKingdoms(await kingdomsApi.getKingdomsByName(searchText)));
    }
    getAllKingdoms();

    

  }, [dispatch, searchText]);


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
        <KingdomItem kingdoms={PropsKingdomItem.kingdoms} 
          addKingdomToApplication={PropsKingdomItem.addKingdomToApplication} />
      </div>
    </div>
  );
}

export default KingdomsFeed;
