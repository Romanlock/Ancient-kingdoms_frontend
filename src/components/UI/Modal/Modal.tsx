import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal(props: any) {
  switch (props.variant) {      
    case '2buttons':
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{props.text}</h4>
            <p>{props.error}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              {props.canselText}
            </Button>
            <Button variant="primary" onClick={props.handleSave}>
              {props.saveText}
            </Button>
          </Modal.Footer>
        </Modal>
      );

    default:
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{props.text}</h4>
            <p>{props.error}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      );
  }
}

export default MyModal;
