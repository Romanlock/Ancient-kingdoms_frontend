import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Nav, Navbar, NavDropdown, InputGroup, Form }from 'react-bootstrap';

import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../hooks/useAuth';
import { useApplication } from '../../hooks/useApplication';


function NavbarUser() {
  const navigate = useNavigate()

  const { user, isAuthorized, isModerator, logout } = useAuth()
  const { 
    applicationsCount, 
    applicationToCreateKingdomsCount, 
    setApplications } = useApplication();

  useEffect(() => {
    setApplications(null);  
  }, [user])

 return (
  <div>
    <Navbar expand="lg" className="bg-body-tertiary d-flex justify-content-between" fixed='top'>
      <Breadcrumbs />
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
              <Nav.Link style={{ whiteSpace: 'nowrap' }}>
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
                <div></div>
              )}
              
              <NavDropdown title={user.Name} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logout}>Выйти</NavDropdown.Item>
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
