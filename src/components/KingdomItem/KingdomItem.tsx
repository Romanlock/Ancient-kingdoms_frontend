import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru'; 
import 'react-datepicker/dist/react-datepicker.css';

import { PropsKingdomItemInterface } from "../../Interfaces/PropsInterfaces/PropsKingdomItemInterface";
import { stopPropagation } from "../../utils/componentFunctions/StopPropagation";
import { addKingdomToApplication } from "../../utils/componentFunctions/AddKingdomToApplication";


registerLocale('ru', ru);

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

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [dateFrom, dateTo] = dates;
    setDateFrom(dateFrom);
    setDateTo(dateTo);
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
      <div 
        className="feed-kingdom__kingdom_btns"
        onClick={(e) => e.stopPropagation()}
      >
        <Row>
          {/* <Col xs={6}> */}
            <Button 
              onClick={e => {
                e.stopPropagation();
                addKingdomToApplication(dateFrom, dateTo, kingdom);
              }}>
              Захватить
            </Button>
          </Row>    
          <Row>
            <DatePicker
              placeholderText="Выберите сроки"
              selected={dateFrom}
              onChange={handleDateChange}
              startDate={dateFrom}
              endDate={dateTo}
              selectsRange
              dateFormat="dd/MM/yyyy"
              locale={ru}
            />
          {/* </Col>         */}
        </Row>    
      </div>
    </Col>
  );
}

export default KingdomItem;
