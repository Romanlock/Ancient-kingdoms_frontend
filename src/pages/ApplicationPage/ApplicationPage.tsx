import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";

import { KingdomWithTerm } from "../../Interfaces/dataStructures/KingdomInterface";
import { useApplication } from "../../hooks/useApplication";
import MyModal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import KingdomItem from "../../components/KingdomItem/KingdomItem";
import ApplicationStatusSelector from "../../components/UI/Selector/ApplicationStatusSelector";
import { useApp } from "../../hooks/useApp";
import { errorMatching } from "../../utils/errorMatching/errorMatching";


const ApplicationPage: React.FC<{isModerator: boolean}> = ({ isModerator }) => {
  const { id } = useParams();

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');
  const [modalHandleHideMode, setModalHandleHideMode] = useState<Number | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const { setCurrentPage, deleteCurrentPage } = useApp();

  const navigate = useNavigate();

  const { currentApplication, 
    setCurrentApplication,
    deleteCurrentApplication,
    updateApplicationStatus } = useApplication();

  const sendApplication = () => {
    updateApplicationStatus(currentApplication.Id, 'На рассмотрении')
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки:');
          setModalError(errorMatching(result.response?.Message!));
          setModalVariant('');
          setModalCanselText('Закрыть');
          setModalShow(true);

          setIsLoaded(true);
          
          return;
        }

        navigate('/application');
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки:');
        setModalError(errorMatching(error));
        setModalVariant('');
        setModalCanselText('Закрыть');
        setModalShow(true);

        setIsLoaded(true);
      });
  }

  const modalHideDefault = () => {   // modal hide mode 1
    setModalTitle('');
    setModalText('');
    setModalError('');
    setModalVariant('');
    setModalCanselText('');
    setModalSaveText('');
    setModalShow(false);
  }

  const modalHideGotoApplications = () => {    // modal hide mode 2
    setModalTitle('');
    setModalText('');
    setModalError('');
    setModalVariant('');
    setModalCanselText('');
    setModalSaveText('');
    setModalHandleHideMode(null);
    setModalShow(false);
    navigate('/application');
  }

  useEffect(() => {
    setCurrentPage('Просмотр записи');

    if (!/^\d+$/.test(id!)) {
      setModalTitle('Ошибка');
      setModalText('Детали ошибки')
      setModalError('Неверный формат записи');
      setModalCanselText('Закрыть');
      setModalVariant('');
      setModalHandleHideMode(2);
      setModalShow(true);

      setIsLoaded(true);
    } else {
      setCurrentApplication(+id!)
        .then(result => {
          if (!result.result) {
            setModalTitle('Ошибка');
            setModalText('Детали ошибки')
            setModalError(errorMatching(result.response?.Message!));
            setModalCanselText('Закрыть');
            setModalVariant('');
            setModalHandleHideMode(2);
            setModalShow(true);

            setIsLoaded(true);

            return;
          }
          
          setIsLoaded(true);
        })
        .catch(error => {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки:');
          setModalError(errorMatching(error));
          setModalVariant('');
          setModalCanselText('Закрыть');
          setModalHandleHideMode(2);
          setModalShow(true);

          setIsLoaded(true);
        });
    }

    return () => {
      deleteCurrentApplication();
      deleteCurrentPage();
    };
  }, [])

  if (!isLoaded) {
    return <Loader />
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
          switch (modalHandleHideMode) {
            case 1:
              modalHideDefault();
              break;
            case 2: 
              modalHideGotoApplications();
              break;
            default:
              modalHideDefault();
          }
          
        }}
      />
    );
  }

  return (
    <div className="application-page">
      <Form as={Row} xs={12} sm={8} md={4} lg={3}
      style={{ marginRight: 0 }}
      className={``}
      >
        <Form.Group as={Col} xs={3} sm={3} md={3} lg={3} 
        className="applications-feed__ruler">
          <Form.Label column>
            Правитель
          </Form.Label>
          <Col className="applications-feed__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly={ currentApplication.State === 'В разработке' ? false : true}
            defaultValue={currentApplication.Ruler} />
          </Col>
        </Form.Group>
        <Form.Group as={Col} xs={4} sm={4} md={4} lg={4} 
        className="applications-feed__state_and_check">
          <Form.Label column>
            Статус записи
          </Form.Label>
          <Col className="applications-feed__textcontent">
            { isModerator ? (
              <ApplicationStatusSelector />
            ) : (
              <Form.Control className="text-base1-medium"
              plaintext readOnly defaultValue={currentApplication.State} />
            ) }
          </Col>
          <Form.Label column>
            Проверка
          </Form.Label>
          <Col className="applications-feed__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={ currentApplication.Check ? 
            'Заявка подтверждена' : 
            'Заявка не подтверждена'} />
          </Col>
        </Form.Group>
        <Form.Group as={Col} xs={5} sm={5} md={5} lg={5} 
        className="applications-feed__dates">
          <Form.Label column className="applications-feed__dates_create">
            Дата создания
          </Form.Label>
          <Col className="applications-feed__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={currentApplication.DateCreate.toString().split('T')[0]} />
          </Col>
          <Form.Label column className="applications-feed__dates_send">
            Дата оформления
          </Form.Label>
          <Col className="applications-feed__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={ currentApplication.DateSend.toString().split('T')[0] === '0001-01-01' ?
            'Запись еще не отправлена' : currentApplication.DateSend.toString().split('T')[0] } />
          </Col>
          <Form.Label column className="applications-feed__dates_complete">
            Дата принятия решения
          </Form.Label>
          <Col className="applications-feed__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={ currentApplication.DateComplete.toString().split('T')[0] === '0001-01-01' ?
            'Запись еще не проверена' : currentApplication.DateComplete.toString().split('T')[0] } />
          </Col>
        </Form.Group>
      </Form>  
      <Row style={{justifyContent: 'center', marginRight: 0}} >
        {currentApplication.KingdomsWithTerm?.map((kingdomWithTerm: KingdomWithTerm) => (
          <KingdomItem 
          key={kingdomWithTerm.Kingdom.Id}
          kingdom={kingdomWithTerm.Kingdom}
          inApplication={true}
          applicationDateFrom={kingdomWithTerm.From}
          applicationDateTo={kingdomWithTerm.To}
          disabled={ currentApplication.State === 'В разработке' ? false : true }
          />              
        ))}
      </Row>
      <Button onClick={() => sendApplication()}>
        Отправить
      </Button>
    </div>
  )
}

export default ApplicationPage;
