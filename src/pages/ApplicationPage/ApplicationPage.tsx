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
  const [modalHandleSaveMode, setModalHandleSaveMode] = useState<Number | null>(null);
  const [modalHandleHideMode, setModalHandleHideMode] = useState<Number | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const { setCurrentPage, deleteCurrentPage } = useApp();

  const navigate = useNavigate();

  const { setApplicationToCreate,
    currentApplication, 
    setCurrentApplication,
    deleteCurrentApplication,
    updateApplicationStatus,
    deleteApplication,
  } = useApplication();

  const saveApplication = () => {
    
  }

  const checkAndSendApplication = () => {
    setModalTitle('Внимание');
    setModalText('Вы уверены, что хотите отправить запись?')
    setModalError('После отправки редактирование будет невозможно');
    setModalVariant('2buttons');
    setModalCanselText('Не отправлять');
    setModalSaveText('Отправить');
    setModalHandleSaveMode(1);
    setModalShow(true);
  }

  const checkAndDeleteApplication = () => {
    setModalTitle('Внимание');
    setModalText('Вы уверены, что хотите удалить эту запись?')
    setModalError('Отменить действие будет невозможно');
    setModalVariant('2buttons');
    setModalCanselText('Оставить');
    setModalSaveText('Удалить');
    setModalHandleSaveMode(2);
    setModalShow(true);
  }

  const modalSendApplication = () => {    // modal save mode 1
    updateApplicationStatus(currentApplication.Id, 'На рассмотрении')
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки')
          setModalError(result.response?.Message!);
          setModalVariant('');
          setModalShow(true);

          return;
        }

        setModalTitle('Запись отправлена');
        setModalText('')
        setModalError('');
        setModalCanselText('');
        setModalSaveText('');
        setModalVariant('withProgress');
        setModalHandleHideMode(2);
        setModalShow(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки')
        setModalError(error);
        setModalVariant('');
        setModalShow(true);
      });
  }

  // real delete
  // const modalDeleteApplication = () => {    // modal save mode 2
  //   deleteApplication(currentApplication.Id)
  //     .then(result => {
  //       if (!result.result) {
  //         setModalTitle('Ошибка');
  //         setModalText('Детали ошибки')
  //         setModalError(result.response?.Message!);
  //         setModalVariant('');
  //         setModalShow(true);

  //         return;
  //       }

  //       setModalTitle('Запись удалена');
  //       setModalText('')
  //       setModalError('');
  //       setModalCanselText('');
  //       setModalSaveText('');
  //       setModalVariant('withProgress');
  //       setModalShow(true);
  //       setModalHandleHideMode(2);
  //     })
  //     .catch(error => {
  //       setModalTitle('Ошибка');
  //       setModalText('Детали ошибки')
  //       setModalError(error);
  //       setModalVariant('');
  //       setModalShow(true);
  //     });
  // }

  const modalDeleteApplication = () => {    // modal save mode 2
    updateApplicationStatus(currentApplication.Id, 'Удалена')
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки')
          setModalError(result.response?.Message!);
          setModalVariant('');
          setModalShow(true);

          return;
        }

        setModalTitle('Запись удалена');
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
        setModalVariant('');
        setModalShow(true);
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

  const modalHideReload = () => {   // modal hide mode 3
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
            case 3:
              modalHideReload();
              break;
            default:
              modalHideDefault();
              break;
          }
        }}
        handleSave={() => {
          switch (modalHandleSaveMode) {
            case 1:
              modalSendApplication();
              break;
            case 2: 
              modalDeleteApplication();
              break;
            default:
              break;
          }
        }}
      />
    );
  }

  return (
    <div className="application-page">
      <Form as={Row} xs={12} sm={8} md={4} lg={3}
      style={{ marginRight: 0 }}
      className="application-page__data"
      >
        <Form.Group as={Col} xs={3} sm={3} md={3} lg={3} 
        className="applications-page__ruler">
          <Form.Label column>
            Правитель
          </Form.Label>
          <Col className="applications-page__textcontent">
            <Form.Control className="text-base1-medium"
            placeholder="Введите правителя"
            defaultValue={ currentApplication.Ruler ? currentApplication.Ruler : ''}
            plaintext={ currentApplication.State === 'В разработке' ? false : true}
            readOnly={ currentApplication.State === 'В разработке' ? false : true}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Col} xs={4} sm={4} md={4} lg={4} 
        className="applications-page__state_and_check">
          <Form.Label column>
            Статус записи
          </Form.Label>
          <Col className="applications-page__textcontent">
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
          <Col className="applications-page__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={ currentApplication.Check ? 
            'Заявка подтверждена' : 
            'Заявка не подтверждена'} />
          </Col>
        </Form.Group>
        <Form.Group as={Col} xs={3} sm={3} md={3} lg={3} 
        className="applications-page__dates">
          <Form.Label column className="applications-page__dates_create">
            Дата создания
          </Form.Label>
          <Col className="applications-page__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={currentApplication.DateCreate.toString().split('T')[0]} />
          </Col>
          <Form.Label column className="applications-page__dates_send">
            Дата оформления
          </Form.Label>
          <Col className="applications-page__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={ currentApplication.DateSend.toString().split('T')[0] === '0001-01-01' ?
            'Запись еще не отправлена' : currentApplication.DateSend.toString().split('T')[0] } />
          </Col>
          <Form.Label column className="applications-page__dates_complete">
            Дата принятия решения
          </Form.Label>
          <Col className="applications-page__textcontent">
            <Form.Control className="text-base1-medium"
            plaintext readOnly 
            defaultValue={ currentApplication.DateComplete.toString().split('T')[0] === '0001-01-01' ?
            'Запись еще не проверена' : currentApplication.DateComplete.toString().split('T')[0] } />
          </Col>
        </Form.Group>
        <Form.Group as={Col} xs={2} sm={2} md={2} lg={2} 
        className="application-page__btns">
        { currentApplication.State === 'В разработке' ? (
          <div className="application-page__send_and_save">
            <Button onClick={() => checkAndSendApplication()}>
              Отправить
            </Button>
            <Button variant="success" onClick={() => saveApplication()}>
              Сохранить
            </Button>
          </div>
          ) : (<></>) 
        }
          <Button variant="danger" onClick={() => checkAndDeleteApplication()}>
            Удалить
          </Button>
        </Form.Group>
      </Form>
      <div className="application-page__data-padding" />
      <Row className="application-page__kingdoms">
        { currentApplication.KingdomsWithTerm ? (
        currentApplication.KingdomsWithTerm?.map((kingdomWithTerm: KingdomWithTerm) => (
          <KingdomItem 
          key={kingdomWithTerm.Kingdom.Id}
          kingdom={kingdomWithTerm.Kingdom}
          inApplication={true}
          applicationDateFrom={kingdomWithTerm.From}
          applicationDateTo={kingdomWithTerm.To}
          disabled={ currentApplication.State === 'В разработке' ? false : true }
          />              
        ))
      ):(
      <span className="application-page__no_kingdoms">
        <span className="application-page__no_kingdoms-span text-h2-medium">
          В заявке пока нет княжеств
        </span>
        <Button className="application-page__no_kingdoms-btn" variant="info"
        onClick={() => navigate('/kingdom')}>
          Добавить
        </Button>
      </span>
      )}
      </Row>
    </div>
  )
}

export default ApplicationPage;
