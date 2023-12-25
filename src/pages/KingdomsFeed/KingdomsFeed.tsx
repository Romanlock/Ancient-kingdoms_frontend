import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Form, Row, Container, Col, Button } from 'react-bootstrap';
import KingdomItem from '../../components/KingdomItem/KingdomItem';
import { KingdomsApi } from '../../utils/api/KingdomsApi/KingdomsApi'
import { setKingdoms } from '../../stores/KingdomStore';
import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";


const KingdomsFeed: React.FC = () => {
  const kingdomsApi = new KingdomsApi();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const { kingdoms } = useSelector((store: any) => {
    return store.kingdom;
  });


 

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

        <Container className="feed-kingdoms">
          <Row style={{justifyContent: 'center'}}>
            {kingdoms?.map((kingdom: Kingdom) => (
              <KingdomItem 
              key={kingdom.Id} // Присваиваем уникальный ключ
              kingdom={kingdom}
            />

              // <Col xs={12} sm={8} md={4} lg={3} 
              // className={`feed-kingdom feed-kingdom__kingdom-${kingdom.Id} m-1 p-1`} 
              // onClick={() => navigate(`/kingdom/${kingdom.Id}`)}
              // key={index}>
              //   <div className="feed-kingdom__kingdom_title">
              //     <div className="feed-kingdom__kingdom_title-text text-h2-medium" style={{textAlign: 'center'}}>{kingdom.Name}</div>
              //   </div>
              //   <div className="feed-kingdom__kingdom_img p-1">
              //     <img src={kingdom.Image} alt={kingdom.Name} className="w-100" />
              //   </div>
              //   <div className="feed-kingdom__kingdom_btns">
              //     <Row>
              //       <Col>
              //         <Button 
              //           onClick={e => {
              //             e.stopPropagation();
              //             addKingdomToApplication(kingdom.Id);
              //           }}>
              //           Захватить
              //         </Button>
              //       </Col>
              //     </Row>                
              //   </div>
              //   <div onClick={stopPropagation}>

              //   <DatePicker
              //     selected={selectedDate}
              //     onChange={(date, event) => handleDateChange(date, event)}
              //     dateFormat="dd/MM/yyyy" // Формат даты, можно изменить по вашим требованиям
              //   />
              //   </div>
              // </Col>
              
            ))}
          </Row>
        </Container>

        {/* <KingdomItem kingdoms={PropsKingdomItem.kingdoms} 
          addKingdomToApplication={PropsKingdomItem.addKingdomToApplication} /> */}
      </div>
    </div>
  );
}

export default KingdomsFeed;
