import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";

import { KingdomWithTerm } from "../../Interfaces/dataStructures/KingdomInterface";
import { useApplication } from "../../hooks/useApplication";
import MyModal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import KingdomItem from "../../components/KingdomItem/KingdomItem";


const ApplicationPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);


  const { currentApplication, 
    setCurrentApplication,
    deleteCurrentApplication } = useApplication();

  useEffect(() => {
    if (!/^\d+$/.test(id!)) {
      setModalText('Неверный формат записи');
      setModalShow(true);
      setIsLoaded(true)
    } else {
      setCurrentApplication(+id!)
        .then(result => {
          if (!result.result) {
            setModalText(result.response?.Message!);
            setModalShow(true);
          }
          
          setIsLoaded(true);
        })
        .catch(error => {
          setModalText(error);
          setModalShow(true);
          setIsLoaded(true);
        });
    }    

    return () => deleteCurrentApplication();
  }, [])

  if (!isLoaded) {
    return <Loader />
  }

  return (
    <div className="application-page">
      { modalShow ? (
        <MyModal 
        title={'Не найдено княжество'}
        text={'Детали ошибки:'}
        error={modalText}
        show={true}
        onHide={() => { navigate('/kingdom') }}
      />
      ) : (
        <div>
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
                plaintext readOnly defaultValue={currentApplication.Ruler} />
              </Col>
            </Form.Group>
            <Form.Group as={Col} xs={4} sm={4} md={4} lg={4} 
            className="applications-feed__state_and_check">
              <Form.Label column>
                Статус записи
              </Form.Label>
              <Col className="applications-feed__textcontent">
                <Form.Control className="text-base1-medium"
                plaintext readOnly defaultValue={currentApplication.State} />
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
        </div>
      )}
    </div>
  )
}

export default ApplicationPage;
