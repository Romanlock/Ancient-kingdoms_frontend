import React, { useState } from 'react';
import KingdomItem from '../KingdomItem/KingdomItem';
import MyInput from '../UI/Input/MyInput';

const KingdomsFeed:React.FC = () => {

  const kingdoms = [
    {
      title: "Владимиро-Суздальское",
      description: "Величайший Рус - Добрыня Никитич родом из этого княжества. Ходили слухи, что здесь умели варить зелья силы и храбрости, поэтому именно тут рождались и росли самые и великие Русы",  
      img: "../image/VS.png",
    },
    {
      title: "Галицко-Волынское",
      description: "Галицко-Волынское княжество считалось основным опорным центром базы Древних Русов",
      img: "../image/GV.jpeg",
    },
    {
      title: "Киевское",
      description: "Киевское княжество было лучшим в сфере подготовки Древних Русов к войне против ящеров. Здесь располагались полигоны и тренировочные лагеря, где воины оттачивали свои приемы",
      img: "../image/K.svg",
    },
    {
      title: "Переяславское",
      description: "Именно здесь, в Переяславском княжестве, жили лучшие стратеги, поэтому на базе переяславского кремля проходили собрания с обсуждением тактики защиты и нападения на ящеров",
      img: "../image/P.png",
    },
    {
      title: "Полоцкое",
      description: "Полоцкое княжество считалось кузницей у Древних Русов. Здесь было отлито немало великих оружий: меч Алеши поповича, щит и копье Добрыни Никитича, булава Ильи Муромца",
      img: "../image/Po.png",
    },
    {
      title: "Черниговское",
      description: "Черниговское княжество славилось идейными учеными, которые придумывали новые приемы, позволяющие бить ящеров сотнями. Один из них: \"Славянский зажим яйцами\" - сильнейший известный нам прием", 
      img: "../image/C.png",
    },
  ];

  const [title, setTitle] = useState('');
  const [searchKingdom, setSearchKingdom] = useState('');
  
  return (
    <div className="page">
      <header style={{ textAlign: 'center', fontSize: '40px', marginBottom: '30px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        Топ 6 княжеств Древних Русов
      </header>
      <div className="content">
        <MyInput 
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text" 
          placeholder="Введите название королевства"
        />
        <KingdomItem kingdoms={kingdoms} />
      </div>
    </div>
  );
}

export default KingdomsFeed;
