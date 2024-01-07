import { Col, Row, Form } from "react-bootstrap";

import { Application } from "../../Interfaces/dataStructures/ApplicationInterface";
import { useNavigate } from "react-router-dom";
import { ApplicationStatusSelector } from "../UI/Selector/ApplicationStatusSelector";
import { useEffect } from "react";


const ApplicationItem: React.FC<{ forModerator: boolean, application: Application }> = 
({ forModerator, application }) => {
  const navigate = useNavigate();

  useEffect(() => {

  }, [application])

  return (
    <Form as={Row} xs={12} sm={8} md={4} lg={3}
    className={`applications-feed__application applications-feed__application-${application.Id}`}
    onClick={() => navigate(`/application/${application.Id}`)}
    >
      <Form.Group as={Col} xs={3} sm={3} md={3} lg={3} 
      className="applications-feed__ruler">
        <Form.Label column>
          Правитель
        </Form.Label>
        <Col className="applications-feed__textcontent">
          <Form.Control className="text-base1-medium"
          plaintext readOnly defaultValue={ application.Ruler != '' ? 
          application.Ruler : 'Правитель не выбран' } />
        </Col>
        { forModerator ? (
          <>
            <Form.Label column>
              Пользователь
            </Form.Label>
            <Col className="applications-feed__textcontent">
              <Form.Control className="text-base1-medium"
              plaintext readOnly defaultValue={application.Creator.Name} />
            </Col>
          </>
        ) : <></>}
      </Form.Group>
      <Form.Group as={Col} xs={4} sm={4} md={4} lg={4} 
      className="applications-feed__state_and_check">
        <Form.Label column>
          Статус записи
        </Form.Label>
        <Col className="applications-feed__textcontent" 
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }
        }>
          { forModerator ? (
            <ApplicationStatusSelector 
            applicationId={application.Id!} 
            defaultValue={application.State}/>
          ) : (
            <Form.Control className="text-base1-medium"
            plaintext readOnly defaultValue={application.State} />
          ) }
        </Col>
        <Form.Label column>
          Проверка
        </Form.Label>
        <Col className="applications-feed__textcontent">
          <Form.Control className="text-base1-medium"
          plaintext readOnly 
          value={ application.Check ? 'Заявка подтверждена' : 'Заявка не подтверждена'} />
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
          defaultValue={application.DateCreate.toString().split('T')[0]} />
        </Col>
        <Form.Label column className="applications-feed__dates_send">
          Дата оформления
        </Form.Label>
        <Col className="applications-feed__textcontent">
          <Form.Control className="text-base1-medium"
          plaintext readOnly 
          defaultValue={ application.DateSend.toString().split('T')[0] === '0001-01-01' ?
          'Запись еще не отправлена' : application.DateSend.toString().split('T')[0] } />
        </Col>
        <Form.Label column className="applications-feed__dates_complete">
          Дата принятия решения
        </Form.Label>
        <Col className="applications-feed__textcontent">
          <Form.Control className="text-base1-medium"
          plaintext readOnly 
          defaultValue={ application.DateComplete.toString().split('T')[0] === '0001-01-01' ?
          'Запись еще не проверена' : application.DateComplete.toString().split('T')[0] } />
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ApplicationItem;
