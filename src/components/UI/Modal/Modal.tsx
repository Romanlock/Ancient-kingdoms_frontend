import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

interface MyModalProps {
  title: string;
  text: string;
  error: string;
  variant: string;
  canselText: string;
  saveText: string;
  onHide: () => void;
  handleSave?: () => void;
  show: boolean;
}

const MyModal: React.FC<MyModalProps> = (props) => {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    if (props.variant !== 'withProgress') {
      return;
    }
    
    let timer: NodeJS.Timeout;

    const resetProgress = () => {
      clearInterval(timer);
      setProgress(100);
    };

    if (props.show) {
      resetProgress();

      let count = 2.0;
      timer = setInterval(() => {
        count -= 0.1;
        setProgress((count / 2) * 100);

        if (count <= 0.1) {
          resetProgress();
          props.onHide();
        }
      }, 100);
    }

    return () => {
      resetProgress();
    };
  }, [props.show, props.onHide]);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.text}</h4>
        <p>{props.error}</p>
        {props.variant === '2buttons' ? (
          <div className='modal-2buttons__buttons'>
            <Button variant="primary" onClick={props.onHide}>
              {props.canselText}
            </Button>
            <Button variant="danger" onClick={props.handleSave}>
              {props.saveText}
            </Button>
          </div>
        ) : props.variant === 'withProgress' ? (
          <div>
            <ProgressBar animated now={progress} label={`${(progress / 100 * 2).toFixed(1)} сек`} />
          </div>
        ) : (
          <div>
            <Button onClick={props.onHide}>{props.canselText}</Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
