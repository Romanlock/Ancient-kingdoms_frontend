import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useApplication } from "../../hooks/useApplication";
import MyModal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { Application } from "../../Interfaces/dataStructures/ApplicationInterface";
import ApplicationItem from "../../components/ApplicationItem/ApplicationItem";


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

  useEffect(() => {
    setApplications(null)
      .then(result => {
        if (!result.result) {
          setModalTitle('Ошибка');
          setModalText('Детали ошибки:');
          setModalError(result.response?.Message!);
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
        setModalError(error);
        setModalVariant('');
        setModalCanselText('Закрыть');
        setModalShow(true);

        setIsLoaded(true);
      })

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
            {applications?.map((application: Application) => (
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