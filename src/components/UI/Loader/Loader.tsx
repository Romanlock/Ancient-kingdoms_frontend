import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div>
      <Spinner animation="border" role="status" />
      <span className="loader-text">Loading...</span>
    </div>
  );
}

export default Loader;