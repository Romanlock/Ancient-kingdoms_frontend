import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import { parseISO } from "date-fns";
import ru from 'date-fns/locale/ru'; 

import { Kingdom } from "../../Interfaces/dataStructures/KingdomInterface";
import { useApplication } from "../../hooks/useApplication";
import MyModal from "../UI/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";


registerLocale('ru', ru);


const KingdomItem: React.FC<{ kingdom: Kingdom; inApplication: boolean, disabled: boolean,
  applicationDateFrom: Date | null, applicationDateTo: Date | null }> = 
  ({ kingdom, inApplication, applicationDateFrom, applicationDateTo, disabled }) => {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');
  const [modalHandleSaveMode, setModalHandleSaveMode] = useState<Number | null>(null);
  const [modalHandleHideMode, setModalHandleHideMode] = useState<Number | null>(null);

  const { applicationToCreate,
    createApplication,
    addKingdomToApplication, 
    deleteKingdomFromApplication } = useApplication();

  const { isAuthorized } = useAuth();

  const navigate = useNavigate();

  const checkAndAddKingdomToApplication = () => {
    if (!isAuthorized) {
      setModalTitle('Ошибка');
      setModalText('Вы не авторизованы')
      setModalError('Желаете авторизоваться?');
      setModalCanselText('Нет');
      setModalSaveText('Да');
      setModalVariant('2buttons');
      setModalHandleSaveMode(1);
      setModalShow(true);

      return;
    }

    if (!dateFrom) {
      setModalTitle('Ошибка');
      setModalText('Детали ошибки')
      setModalError('Выберите дату начала правления');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);   

      return;
    }

    if (!dateTo) {
      setModalTitle('Ошибка');
      setModalText('Детали ошибки')
      setModalError('Выберите дату окончания правления');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);

      return;
    }

    if (dateFrom >= dateTo) {
      setModalTitle('Ошибка');
      setModalText('Детали ошибки')
      setModalError('Выберите корректные даты правления');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);
      
      return;
    }

    if (!applicationToCreate) {
      createApplication(dateFrom, dateTo, kingdom)
        .then(result => {
          if (!result.result) {
            setModalTitle('Ошибка');
            setModalText('Детали ошибки')
            setModalError(result.response?.Message!);
            setModalCanselText('Закрыть');
            setModalVariant('');
            setModalShow(true);

            return;
          }

          setModalTitle('Княжество добавлено');
          setModalVariant('withProgress');
          setModalShow(true);

          return;
        })

        .catch(error => {
          console.log(error)
          setModalTitle('Ошибка');
          setModalText('Детали ошибки')
          setModalCanselText('Закрыть');
          setModalError(error);
          setModalVariant('');
          setModalShow(true);
        });
    } else {
      addKingdomToApplication(dateFrom, dateTo, kingdom)
        .then(result => {
          if (!result.result) {
            setModalTitle('Ошибка');
            setModalText('Детали ошибки')
            setModalError(result.response?.Message!);
            setModalCanselText('Закрыть');
            setModalVariant('');
            setModalShow(true);

            return;
          }

          setModalTitle('Княжество добавлено');
          setModalVariant('withProgress');
          setModalShow(true);
        })

        .catch(error => {
          console.log(error)
          setModalTitle('Ошибка');
          setModalText('Детали ошибки')
          setModalCanselText('Закрыть');
          setModalError(error);
          setModalVariant('');
          setModalShow(true);
        });
    }
  }

  const checkAndDeleteKingdom = () => {
    setModalTitle('Внимание');
    setModalText('Вы уверены, что хотите удалить княжество из записи?')
    setModalError('Отменить действие будет невозможно');
    setModalVariant('2buttons');
    setModalCanselText('Оставить');
    setModalSaveText('Удалить');
    setModalHandleSaveMode(2);
    setModalShow(true);
  }

  const modalDeleteKingdom = () => {    // modal save mode 2
    deleteKingdomFromApplication(kingdom.Id)
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки')
          setModalError(result.response?.Message!);
          setModalCanselText('Закрыть');
          setModalVariant('');
          setModalShow(true);

          return;
        }

        setModalTitle('Княжество удалено');
        setModalText('')
        setModalError('');
        setModalCanselText('');
        setModalSaveText('');
        setModalVariant('withProgress');
        setModalShow(true);
        setModalHandleHideMode(2);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки')
        setModalError(error);
        setModalCanselText('Закрыть');
        setModalVariant('');
        setModalShow(true);
      });
  }

  const modalGotoLogin = () => {    // modal save mode 1
    navigate('/login');
  }

  const modalHideDefault = () => {   // modal hide mode 1
    setModalTitle('');
    setModalText('');
    setModalError('');
    setModalVariant('');
    setModalCanselText('');
    setModalSaveText('');
    setModalShow(false);
    setModalHandleSaveMode(null);
  }

  const modalHideDelete = () => {   // modal hide mode 2
    setModalTitle('');
    setModalText('');
    setModalError('');
    setModalVariant('');
    setModalCanselText('');
    setModalSaveText('');
    setModalShow(false);
    setModalHandleSaveMode(null);
    setModalHandleHideMode(null);
    window.location.reload();
  }

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [dateFrom, dateTo] = dates;
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  };

  useEffect(() => {
    // if (inApplication && !disabled) {
      if (applicationDateFrom && applicationDateTo) {
        setDateFrom(parseISO(applicationDateFrom!.toString()))
        setDateTo(parseISO(applicationDateTo!.toString()))
      }
    // }
  }, [inApplication, disabled, applicationDateFrom, applicationDateTo]);
  
  if (modalShow) {
    return (
      <MyModal 
        title={modalTitle}
        text={modalText}
        error={modalError}
        show={modalShow}
        variant={modalVariant}
        canselText={modalCanselText}
        saveText={modalSaveText}
        onHide={() => {
          switch (modalHandleHideMode) {
            case 1:
              modalHideDefault();
              break;
            case 2: 
              modalHideDelete();
              break;
            default:
              modalHideDefault();
          }
          
        }}
        handleSave={() => {
          switch (modalHandleSaveMode) {
            case 1:
              modalGotoLogin();
              break;
            case 2: 
              modalDeleteKingdom();
              break;
            default:
              break;
          }
        }}
      />
    );
  }

  return (
    <Col xs={12} sm={8} md={4} lg={3} 
    className={`feed-kingdom feed-kingdom__kingdom-${kingdom.Id} m-1 p-1`}>
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
                      selected={dateFrom}
                      onChange={handleDateChange}
                      startDate={dateFrom}
                      endDate={dateTo}
                      disabled={false}
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
    </Col>
  );
}

export default KingdomItem;
