import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useApplication } from "../../hooks/useApplication";
import MyModal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { Application } from "../../Interfaces/dataStructures/ApplicationInterface";
import ApplicationItem from "../../components/ApplicationItem/ApplicationItem";


const ApplicationFeed: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState('');

  const navigate = useNavigate();

  const { applications, setApplications } = useApplication();

  useEffect(() => {
    setApplications(null)
      .then(result => {
        if (!result.result) {
          setModalText(result.response?.Message);
          setModalShow(true);
        }

        setIsLoaded(true);
      })
      .catch(error => {
        console.log(error);
        setModalText(error);
        setModalShow(true);
        setIsLoaded(true);
      })

  }, [])

  if (!isLoaded) {
    return <Loader />
  }

  return (
    <div className="applications-page">
      { modalShow ? (
        <MyModal
          title={'Не найдены записи'}
          text={'Детали:'}
          error={modalText}
          show={true}
          onHide={() => navigate('/kingdom')}
        />
      ) : (
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
      )}
    </div>
  )
}

export default ApplicationFeed;