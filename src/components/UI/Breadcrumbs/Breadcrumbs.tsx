import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Breadcrumbs() {
 const location = useLocation();
 const [path, setPath] = useState(location.pathname);

 useEffect(() => {
  setPath(location.pathname);
 }, [location.pathname]);

 const pathComponents = path.split('/');

 return (
  <Breadcrumb>
  {pathComponents?.map((component, index) => (
    <Breadcrumb.Item href={component} key={index}>{component}</Breadcrumb.Item>
  ))}
  </Breadcrumb>
 );
}

export default Breadcrumbs;
