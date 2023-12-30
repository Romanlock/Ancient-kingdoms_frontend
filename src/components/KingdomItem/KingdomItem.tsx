import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import { parseISO } from "date-fns";
import ru from 'date-fns/locale/ru'; 

import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";
import { useApplication } from "../../hooks/useApplication";
import MyModal from "../UI/Modal/Modal";
import { ResponseDefault } from "../../utils/api/ResponseInterface";


registerLocale('ru', ru);


const KingdomItem: React.FC<{ kingdom: Kingdom; inApplication: boolean, disabled: boolean,
  applicationDateFrom: Date | null, applicationDateTo: Date | null }> = 
  ({ kingdom, inApplication, applicationDateFrom, applicationDateTo, disabled }) => {
  const [from, setFrom] = useState('')
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalVariant, SetModalVariant] = useState('');

  const { addKingdomToApplication, deleteKingdomFromApplication } = useApplication();

  const checkAndAddKingdomToApplication = () => {
    if (!dateFrom) {
      setModalText('Выберите дату начала правления');
      setModalShow(true);

      return;
    }

    if (!dateTo) {
      setModalText('Выберите дату окончания правления');
      setModalShow(true);
      
      return;
    }

    if (dateFrom >= dateTo) {
      setModalText('Выберите корректные даты правления');
      setModalShow(true);
      
      return;
    }

    addKingdomToApplication(dateFrom, dateTo, kingdom)
      .then(result => {
        if (!result.result) {
          setModalText(result.response?.Message!);
          setModalShow(true);
        }
      })
      .catch(error => {
        setModalText(error);
        setModalShow(true);
      });
  }

  const checkAndDeleteKingdom = () => {
    setModalText('Вы уверены, что хотите удалить княжество из записи');
    SetModalVariant('2buttons');
    setModalShow(true);
  }

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [dateFrom, dateTo] = dates;
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  };

  const navigate = useNavigate();

  useEffect(() => {

  })

  return (
    <Col xs={12} sm={8} md={4} lg={3} 
    className={`feed-kingdom feed-kingdom__kingdom-${kingdom.Id} m-1 p-1`}>
       { modalShow ? (
        <MyModal 
        title={'Не найдена запись'}
        text={'Детали ошибки:'}
        error={modalText}
        show={setModalShow}
        variant={modalVariant}
        onHide={() => setModalShow(false)}
        handleSave={() => {
          deleteKingdomFromApplication(kingdom.Id)
            .then(result => {
              if (!result.result) {
                setModalText(result.response?.Message!);
                setModalShow(true);
              }

              // window.location.reload();
            })
            .catch(error => {
              setModalText(error);
              setModalShow(true);
            });
          }
        }
      />
      ) : (
        <Col onClick={() => navigate(`/kingdom/${kingdom.Id}`)}>
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
            { !inApplication ? (  // case open from feed
              <div>
                <Row>
                  <Button 
                    onClick={e => {
                      e.stopPropagation();
                      checkAndAddKingdomToApplication();
                    }}>
                    Добавить в заявку
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
                </Row>    
              </div>
            ) : (  // case open from application
              <div>
                { disabled ? (  // case application sended
                  <Row>
                    <DatePicker
                      placeholderText="Выберите сроки"
                      // selected={parseISO(applicationDateFrom!.toString())}
                      // onChange={() => {}}
                      // startDate={parseISO(applicationDateFrom!.toString())}
                      // endDate={parseISO(applicationDateTo!.toString())}
                      selected={dateFrom}
                      onChange={() => {}}
                      startDate={dateFrom}
                      endDate={dateTo}
                      disabled={true}
                      selectsRange
                      dateFormat="dd/MM/yyyy"
                      locale={ru}
                    />
                </Row>
                ) : (  // case application can be modified
                  <div>
                    <Row>
                      <Button 
                        onClick={e => {
                          e.stopPropagation();
                          checkAndAddKingdomToApplication();
                        }}>
                        Сохранить новые сроки
                      </Button>
                    </Row>
                    <Row>
                      <DatePicker
                        placeholderText="Выберите сроки"
                        selected={parseISO(applicationDateFrom!.toString())}
                        onChange={() => {}}
                        startDate={parseISO(applicationDateFrom!.toString())}
                        endDate={parseISO(applicationDateTo!.toString())}
                        disabled={true}
                        selectsRange
                        dateFormat="dd/MM/yyyy"
                        locale={ru}
                      />
                    </Row>
                    <Row>
                      <Button variant="danger" 
                        onClick={e => {
                          e.stopPropagation();
                          checkAndDeleteKingdom();
                        }}>
                        Удалить
                      </Button>
                    </Row>
                  </div>    
                ) }
              </div>    
            )}
          </div>
        </Col>
      ) }
    </Col>
  );
}

export default KingdomItem;
