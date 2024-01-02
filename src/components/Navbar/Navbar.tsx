import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown, InputGroup, Form }from 'react-bootstrap';

import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../hooks/useAuth';
import { useApplication } from '../../hooks/useApplication';
import MyModal from '../UI/Modal/Modal';
import { useApp } from '../../hooks/useApp';


function NavbarUser() {
  const navigate = useNavigate()

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const { currentPage } = useApp();

  const { user, isAuthorized, isModerator, logout } = useAuth()
  const { 
    applications,
    applicationsCount, 
    applicationToCreate,
    applicationToCreateKingdomsCount,
    setApplications,
    setApplicationToCreate,
    setCurrentApplication } = useApplication();

  const checkApplicationToCreate = () => {
    if (!applicationToCreate?.Id) {
      setModalTitle('Ошибка');
      setModalText('Детали ошибки:');
      setModalError('Добавьте хотя бы одно княжество в запись');
      setModalVariant('');
      setModalCanselText('Закрыть');
      setModalShow(true);

      return
    }

    setApplicationToCreate(applicationToCreate.Id)
      .then(result => {
        if (!result.result) {
          setModalText(result.response?.Message!);
          setModalShow(true);
        }

        setCurrentApplication(applicationToCreate.Id)
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
            
            navigate(`/application/${applicationToCreate.Id}`)
          })
          .catch(error => {
            setModalTitle('Ошибка');
            setModalText('Детали ошибки:');
            setModalError(error);
            setModalVariant('');
            setModalCanselText('Закрыть');
            setModalShow(true);
          });
      })
      .catch(error => {
        setModalText(error);
        setModalShow(true);
      });
  }

  useEffect(() => {
    setApplications(null)
  }, [user])

  useEffect(() => {
  }, [applications, applicationToCreate, applicationToCreateKingdomsCount, currentPage])

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
        onHide={() => setModalShow(false)}
      />
    );
  }

 return (
  <div>
    <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between" fixed='top'>
      <Breadcrumbs />
      <span className='text-h2-medium'>{currentPage}</span>
      <Container style={{ width: 'min-content', marginRight: '5%' }}>
        <Navbar.Brand 
        style={{cursor: 'pointer'}}
        onClick={() => navigate('/kingdom')}>
          ARK
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        { isAuthorized ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ whiteSpace: 'nowrap' }}
              onClick={() => checkApplicationToCreate()}>
                Создать запись { applicationToCreateKingdomsCount > 0 ? 
                applicationToCreateKingdomsCount : 
                <div /> }
              </Nav.Link>
              <Nav.Link style={{ whiteSpace: 'nowrap' }}
              onClick={() => navigate('/application')}>
                Мои записи { applicationsCount > 0 ? 
                applicationsCount : 
                <div /> }
              </Nav.Link>
              { isModerator ? (
                <div>
                  <Nav.Link style={{ whiteSpace: 'nowrap' }}>
                    Изменить княжества
                  </Nav.Link>
                  <Nav.Link style={{ whiteSpace: 'nowrap' }}>
                    Добавить княжество
                  </Nav.Link>
                </div>

              ) :(
                <></>
              )}
              
              <NavDropdown title={user.Name} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={ () => {
                  logout()
                    .then(() => {
                      navigate('/login');

                      return;
                    })
            
                    .catch(error => {
                      setModalTitle('Ошибка');
                      setModalText('Детали ошибки')
                      setModalCanselText('Закрыть');
                      setModalError(error);
                      setModalVariant('');
                      setModalShow(true);
                    });
                } }>Выйти</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/login')} style={{ whiteSpace: 'nowrap' }}>Войти</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
    <div className='content' style={{marginTop: 56}} />
  </div>
 );
}

export default NavbarUser;
