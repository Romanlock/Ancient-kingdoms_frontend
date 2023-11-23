import React, { useState, useEffect } from 'react';
import KingdomItem from '../KingdomItem/KingdomItem';
import MyInput from '../UI/Input/MyInput';
import { KingdomsApi } from '../../utils/api/KingdomsApi/KingdomsApi'
import { Kingdom } from '../../dataStrucrures/KingdomInterfase';

const KingdomsFeed: React.FC = () => {
  const kingdomsApi = new KingdomsApi();
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [searchKingdom, setSearchKingdom] = useState('');

  useEffect(() => {
    const getKingdomsRequestParams = {
      kingdomName: '',
      rulerName: 'All',
      state: '',
    }

    getKingdomsRequestParams.kingdomName = searchKingdom ? searchKingdom : '';

    kingdomsApi.getKingdoms(getKingdomsRequestParams)
      .then((data: any) => {
        setKingdoms(data);
      })
      .catch((error: any) => {
        console.error('Ошибка при выполнении запроса getKingdoms:', error);
        throw error;
      });
  }, [searchKingdom]);

  return (
    <div className="page">
      <header style={{ textAlign: 'center', fontSize: '40px', marginBottom: '30px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        Топ 6 княжеств Древних Русов
      </header>
      <div className="content">
        <MyInput
          value={searchKingdom}
          onChange={e => setSearchKingdom(e.target.value)}
          type="text"
          placeholder="Введите название королевства"
        />
        <KingdomItem kingdoms={kingdoms} />
      </div>
    </div>
  );
}

export default KingdomsFeed;
