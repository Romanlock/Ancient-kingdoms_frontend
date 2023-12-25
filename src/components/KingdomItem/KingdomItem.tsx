import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropsKingdomItemInterface } from "../../Interfaces/PropsInterfaces/PropsKingdomItemInterface";
import { stopPropagation } from "../../utils/componentFunctions/StopPropagation";
import { addKingdomToApplication } from "../../utils/componentFunctions/AddKingdomToApplication";

const KingdomItem: React.FC<PropsKingdomItemInterface> = ({ kingdom }) => {
  const [from, setFrom] = useState('')

  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const handleDateFromChange = (date: Date | null, event: any) => {
    event.stopPropagation(); // Предотвращение всплытия события
    setDateFrom(date);
    console.log(date)
  };

  const handleDateToChange = (date: Date | null, event: any) => {
    event.stopPropagation(); // Предотвращение всплытия события
    setDateTo(date);
    console.log(date)
  };


  const dispatch = useDispatch();
  const { currentApplication } = useSelector((store: any) => store.application);

  const navigate = useNavigate();

  useEffect(() => {

  })

  return (
    <Col xs={12} sm={8} md={4} lg={3} 
    className={`feed-kingdom feed-kingdom__kingdom-${kingdom.Id} m-1 p-1`} 
    onClick={() => navigate(`/kingdom/${kingdom.Id}`)}>
      <div className="feed-kingdom__kingdom_title">
        <div className="feed-kingdom__kingdom_title-text text-h2-medium" style={{textAlign: 'center'}}>{kingdom.Name}</div>
      </div>
      <div className="feed-kingdom__kingdom_img p-1">
        <img src={kingdom.Image} alt={kingdom.Name} className="w-100" />
      </div>
      <div className="feed-kingdom__kingdom_btns">
        <Row>
          <Col>
            <Button 
              onClick={e => {
                e.stopPropagation();
                addKingdomToApplication(dateFrom, dateTo, kingdom);
              }}>
              Захватить
            </Button>
          </Col>
        </Row>                
      </div>
      <div onClick={stopPropagation}>
        <DatePicker
          selected={dateFrom}
          onChange={(date, event) => handleDateFromChange(date, event)}
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          selected={dateTo}
          onChange={(date, event) => handleDateToChange(date, event)}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </Col>
  );
}

export default KingdomItem;
