import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { nameMatching } from './nameMatching';


function Breadcrumbs() {
 const location = useLocation();
 const [path, setPath] = useState(location.pathname);

 const navigate = useNavigate();

 const pathComponents = path.split('/');

 const goto = (index: number) => {
  const nestedPath = pathComponents.slice(0, index+1).join('/');
  navigate(nestedPath);
 }

 useEffect(() => {
  setPath(location.pathname);
 }, [location.pathname]);


 return (
  <Breadcrumb>
  {pathComponents?.map((component, index) => (
    <Breadcrumb.Item onClick={() => goto(index)} key={index}>
      {nameMatching(component)}
    </Breadcrumb.Item>
  ))}
  </Breadcrumb>
 );
}

export default Breadcrumbs;
