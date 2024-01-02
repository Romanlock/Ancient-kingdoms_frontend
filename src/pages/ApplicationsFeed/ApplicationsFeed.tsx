import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useApplication } from "../../hooks/useApplication";
import MyModal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { Application } from "../../Interfaces/dataStructures/ApplicationInterface";
import ApplicationItem from "../../components/ApplicationItem/ApplicationItem";
import { useApp } from "../../hooks/useApp";
import { errorMatching } from "../../utils/errorMatching/errorMatching";


const ApplicationFeed: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  const { applications, setApplications } = useApplication();

  const { setCurrentPage, deleteCurrentPage } = useApp();

  const reversedApplications = applications ? [...applications].reverse() : [];

  useEffect(() => {
    setCurrentPage('Мои записи');

    setApplications(null)
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

        setIsLoaded(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки:');
        setModalError(errorMatching(error));
        setModalVariant('');
        setModalCanselText('Закрыть');
        setModalShow(true);

        setIsLoaded(true);
      })

      return () => {
        deleteCurrentPage();
      }

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
        onHide={() => navigate('/kingdom')}
      />
    );
  }

  return (
    <div className="applications-page">
      <div className="applications-page__content">
        <Container>
          <Col className="applications-feed">
            {reversedApplications?.map((application: Application) => (
              <ApplicationItem
              key={application.Id}
              application={application}
              />
            ))}
          </Col>
        </Container>
      </div>
    </div>
  );
}

export default ApplicationFeed;