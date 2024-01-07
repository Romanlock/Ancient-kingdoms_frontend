import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Container, Col, InputGroup, Form, Button } from "react-bootstrap";

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru'; 

import Loader from "../../components/UI/Loader/Loader";
import MyModal from "../../components/UI/Modal/Modal";
import ApplicationItem from "../../components/ApplicationItem/ApplicationItem";
import { Application } from "../../Interfaces/dataStructures/ApplicationInterface";
import { useApplication } from "../../hooks/useApplication";
import { useApp } from "../../hooks/useApp";
import { errorMatching } from "../../utils/errorMatching/errorMatching";
import { ApplicationFeedStatusFilterSelector } from "../../components/UI/Selector/ApplicationStatusSelector";


registerLocale('ru', ru);


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
    moderatorApplicationFeedDateFromFilter,
    moderatorApplicationFeedDateToFilter,
    setModeratorApplicationFeedDateFromFilter,
    deleteModeratorApplicationFeedDateFromFilter,
    setModeratorApplicationFeedDateToFilter,
    deleteModeratorApplicationFeedDateToFilter,
    moderatorApplicationFeedStatusFilter,
  } = useApp();

  const handleUsernameFilterChange = (substring: string) => {
    if (substring) {
      return setModeratorApplicationFeedUsernameFilter(substring);
    }

    return deleteModeratorApplicationFeedUsernameFilter();
  }

  const handleDateChange = (dates: [Date | null, Date |null]) => {
    const [dateFrom, dateTo] = dates;
    switch (true) {
      case (dates[0] !== null && dates[1] !== null):
        setModeratorApplicationFeedDateFromFilter(dateFrom!);
        setModeratorApplicationFeedDateToFilter(dateTo!);
        break;
      case (dates[0] !== null && dates[1] === null):
        setModeratorApplicationFeedDateFromFilter(dateFrom!);
        deleteModeratorApplicationFeedDateToFilter();
        break;
      case (dates[1] !== null):
        deleteModeratorApplicationFeedDateFromFilter();
        setModeratorApplicationFeedDateToFilter(dateTo!);
        break;
      default: 
        deleteModeratorApplicationFeedDateFromFilter();
        deleteModeratorApplicationFeedDateToFilter();
        break;
    }
  }

  useEffect(() => {
    setCurrentPage('Записи пользователей');
  }, [])

  useEffect(() => {
    setApplicationsAll(moderatorApplicationFeedStatusFilter,
      moderatorApplicationFeedDateFromFilter,
      moderatorApplicationFeedDateToFilter)
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

  }, [moderatorApplicationFeedStatusFilter,
    moderatorApplicationFeedDateFromFilter,
    moderatorApplicationFeedDateToFilter])

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
            <Row>
              <Col>
                <DatePicker className="moderator_applications_feed__date_filter"
                placeholderText="Выберите диапазон дат"
                selected={moderatorApplicationFeedDateFromFilter}
                onChange={handleDateChange}
                startDate={moderatorApplicationFeedDateFromFilter}
                endDate={moderatorApplicationFeedDateToFilter}
                selectsRange
                dateFormat="dd/MM/yyyy"
                locale={ru}
              />
            </Col>
              <Col>
                <Button onClick={() => handleDateChange([null, null])}>
                  Сбросить
                </Button>
              </Col>
            </Row>
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