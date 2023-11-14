import React, { useState, useEffect } from 'react';
import KingdomItem from '../KingdomItem/KingdomItem';
import MyInput from '../UI/Input/MyInput';
import { Api } from '../../utils/api/api';

interface Kingdom {
  ID: number,
  Name: string,
  Area: number,
  Capital: string,
  Image: string,
  Description: string;
  State: string;
}

const KingdomsFeed: React.FC = () => {
  const api = new Api();
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [searchKingdom, setSearchKingdom] = useState('');

  useEffect(() => {
    api.getKingdoms(searchKingdom ? searchKingdom : 'All', '')
      .then((data: any) => {
        console.log(data)
        setKingdoms(data);
      })
      .catch((error: any) => {
        console.error('Ошибка при выполнении запроса getKingdoms:', error);
        throw error;
      });
  }, [searchKingdom]);

  // function getSearchedKingdoms(searchKingdom: string): Kingdom[] {
  //   if (searchKingdom === '') {
  //     return kingdoms;
  //   }

  //   api.getKingdoms('All', '')
  //     .then((data: any) => {
  //       setKingdoms(data);
  //     })
  //     .catch((error: any) => {
  //       console.error('Ошибка при выполнении запроса getKingdoms:', error);
  //       throw error;
  //     });

  //   const necessaryKingdoms: Kingdom[] = [];
  //   kingdoms.forEach((kingdom: Kingdom) => {
  //     if (kingdom.Name.toLowerCase().includes(searchKingdom.toLowerCase())) {
  //       necessaryKingdoms.push(kingdom);
  //     }
  //   });

  //   return necessaryKingdoms;
  // }

  // const necessaryKingdoms = getSearchedKingdoms(searchKingdom);

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
