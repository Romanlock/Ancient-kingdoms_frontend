import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Row, Image, Col, ModalTitle } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import { parseISO } from "date-fns";
import ru from 'date-fns/locale/ru'; 

import { useKingdom } from '../../hooks/useKingdom';
import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/Modal/Modal";
import { useApp } from "../../hooks/useApp";
import { useAuth } from "../../hooks/useAuth";
import { useApplication } from "../../hooks/useApplication";


const KingdomPage: React.FC = () => {
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

  const [isLoaded, setIsLoaded] = useState(false); 

  const { isAuthorized, isModerator } = useAuth();
 
  const { kingdom, setKingdom, deleteKingdom } = useKingdom();

  const { applicationToCreate,
    createApplication,
    addKingdomToApplication } = useApplication();
  
  const { setCurrentPage, deleteCurrentPage } = useApp();

  const { id } = useParams();

  const navigate = useNavigate();

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [dateFrom, dateTo] = dates;
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  };


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

  const modalGotoLogin = () => {    // modal save mode 1
    navigate('/login');
  }

  useEffect(() => {
    setCurrentPage('Просмотр княжества');

    if (!/^\d+$/.test(id!)) {
      setModalTitle('Ошибка');
      setModalText('Детали ошибки')
      setModalError('Неверный формат княжества');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalShow(true);

      setIsLoaded(true);
    } else {
      setKingdom(+id!)
        .then(result => {
          if (!result.result) {
            setModalTitle('Ошибка');
            setModalText('Детали ошибки')
            setModalError(result.response?.Message!);
            setModalCanselText('Закрыть');
            setModalVariant('');
            setModalShow(true);

            setIsLoaded(true);

            return;
          }
          
          setIsLoaded(true);
        })
        .catch(error => {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки:');
          setModalError(error);
          setModalVariant('');
          setModalCanselText('Закрыть');
          setModalShow(true);

          setIsLoaded(true);
        });
    }    

    return () => {
      deleteKingdom();
      deleteCurrentPage();
    };
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

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
          setModalTitle('');
          setModalText('');
          setModalError('');
          setModalVariant('');
          setModalCanselText('');
          setModalSaveText('');
          setModalShow(false);
          setModalHandleSaveMode(null);
        }}
        handleSave={() => {
          switch (modalHandleSaveMode) {
            case 1:
              modalGotoLogin();
              break;
            default:
              break;
          }
        }}
      />
    );
  }

  return (
    <div className="kingdom-page">
      <div className="kingdom" style={{ marginTop: '56px'}}>
        <div className="kingdom__title mt-4 text-base1-medium">
          <h2>{kingdom.Name}</h2>
        </div>
        <Container>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs={4}>
              <Image src={kingdom.Image} alt={kingdom.Name} style={{ width: '100%' }} rounded />
            </Col>
            <Col xs={4}>
              <Form>
                <Form.Group className="mb-3" controlId="kingdomArea">
                  <Form.Label>Площадь</Form.Label>
                  <Form.Control type="text" 
                  disabled = {!isModerator} 
                  value={kingdom.Area} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomCapital">
                  <Form.Label>Столица</Form.Label>
                  <Form.Control type="text"
                  disabled = {!isModerator}
                  value={kingdom.Capital} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomDescription">
                  <Form.Label>О княжестве</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                  type="text" disabled = {!isModerator} 
                  value={kingdom.Description} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kingdomState">
                  <Form.Label>Статус</Form.Label>
                  <Form.Control type="text" 
                  disabled = {!isModerator} value={kingdom.State} />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
        <Col className="kingdom-page__date">
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
          <Button onClick={() => checkAndAddKingdomToApplication()}>
            Добавить в запись
          </Button>
        </Col>
        { isModerator ? (
          <Row className="kingdom-page__buttons mb-5" style={{gap: '1rem'}}>
            <Button variant="danger">
              Удалить
            </Button>
            <Button>
              Сохранить
            </Button>
          </Row>
        ) : ( <></> ) }
      </div>
    </div>
  );
}

export default KingdomPage;
