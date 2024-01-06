import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Container, Col, InputGroup, Form } from "react-bootstrap";

import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/Modal/Modal";
import ApplicationItem from "../../components/ApplicationItem/ApplicationItem";
import { Application } from "../../Interfaces/dataStructures/ApplicationInterface";
import { useApplication } from "../../hooks/useApplication";
import { useApp } from "../../hooks/useApp";
import { errorMatching } from "../../utils/errorMatching/errorMatching";
import { ApplicationFeedStatusFilterSelector } from "../../components/UI/Selector/ApplicationStatusSelector";

const ModeratorApplicationFeed: React.FC = () => {
  const [reversedApplications, setReversedApplications] = useState<Application[]>([]);

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  const { applicationsAll, setApplicationsAll } = useApplication();

  const { setCurrentPage, 
    deleteCurrentPage,
    moderatorApplicationFeedUsernameFilter, 
    setModeratorApplicationFeedUsernameFilter,
    deleteModeratorApplicationFeedUsernameFilter,
  } = useApp();

  const handleUsernameFilterChange = (substring: string) => {
    if (substring) {
      return setModeratorApplicationFeedUsernameFilter(substring);
    }

    return deleteModeratorApplicationFeedUsernameFilter();
  }

  useEffect(() => {
    setCurrentPage('Записи пользователей');

    setApplicationsAll()
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки:');
          setModalError(errorMatching(result.response?.Message!));
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
        setModalError(errorMatching(error));
        setModalCanselText('Закрыть');
        setModalVariant('');
        setModalShow(true);

        setIsLoaded(true);
      })

      return () => {
        deleteCurrentPage();
      }

  }, [])

  useEffect(() => {
    const filteredApplications = moderatorApplicationFeedUsernameFilter ? applicationsAll.filter((application: Application) => {
      return application.Creator.Name.toLowerCase().
        includes(moderatorApplicationFeedUsernameFilter?.toLowerCase());
    }) : applicationsAll;
  
    setReversedApplications([...filteredApplications].reverse());
  
  }, [moderatorApplicationFeedUsernameFilter, applicationsAll]);
  
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
        onHide={() => navigate('/kingdom')}
      />
    );
  }

  return (
    <div className="moderator_applications_feed">
      <Container className="moderator_applications_feed__filters">
        <Row>
          <Col>
            <InputGroup className="kingdom-page__filter_username">
              <Form.Control
                placeholder="Введите имя пользователя"
                aria-label="Username"
                value={moderatorApplicationFeedUsernameFilter ? 
                  moderatorApplicationFeedUsernameFilter : ''
                }
                onChange={e => handleUsernameFilterChange(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col>
            <ApplicationFeedStatusFilterSelector />
          </Col>
          <Col>
            {/* <InputGroup className="kingdom-page__filter_username">
              <Form.Control
                placeholder="Введите имя пользователя"
                aria-label="Username"
                value={usernameFilter}
                onChange={e => setUsernameFilter(e.target.value)}
              />
            </InputGroup> */}
          </Col>
        </Row>
        
      </Container>
      <div className="applications-page__content">
        <Container>
          <Col className="applications-feed">
            {reversedApplications?.map((application: Application) => (
              <ApplicationItem
              key={application.Id}
              application={application}
              forModerator={true}
              />
            ))}
          </Col>
        </Container>
      </div>
    </div>
  );
}

export default ModeratorApplicationFeed;