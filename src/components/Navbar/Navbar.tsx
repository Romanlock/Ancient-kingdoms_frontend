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
    <Navbar expand="lg" fixed='top'
    className="navbar bg-body-tertiary d-flex justify-content-between">
      <Container className='navbar-elements'>
        <Navbar.Brand className='navbar-logo text-h2-medium'
          onClick={() => navigate('/kingdom')}>
            ARK
        </Navbar.Brand>
        <Breadcrumbs />
        <span className='text-h2-medium'>{currentPage}</span>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        { isAuthorized ? (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='navbar__item text-base2-medium'
              onClick={() => checkApplicationToCreate()}>
                Создать запись { applicationToCreateKingdomsCount > 0 ? 
                applicationToCreateKingdomsCount : 
                <div /> }
              </Nav.Link>
              <Nav.Link className='navbar__item text-base2-medium'
              onClick={() => navigate('/application')}>
                Мои записи { applicationsCount > 0 ? 
                applicationsCount : 
                <div /> }
              </Nav.Link>
              { isModerator ? (
                <>
                  <Nav.Link className='navbar__item text-base2-medium'>
                    Все записи
                  </Nav.Link>
                  <Nav.Link className='navbar__item text-base2-medium'>
                    Все княжества
                  </Nav.Link>
                </>
              ) :(
                <></>
              )}
              <NavDropdown className='navbar__item text-base2-medium' title={user.Name} id="basic-nav-dropdown">
                <NavDropdown.Item style={{all: 'unset'}} onClick={ () => {
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
            <Nav.Link className='navbar__item text-base2-medium'
            onClick={() => navigate('/login')}>Войти</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
    <div className='navbar-padding'/>
  </div>
 );
}

export default NavbarUser;
