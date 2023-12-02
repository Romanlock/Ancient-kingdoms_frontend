import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Breadcrumbs() {
  const path = window.location.pathname;
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
