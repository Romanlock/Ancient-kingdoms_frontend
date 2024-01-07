import { Form } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";

import { useApp } from "../../../hooks/useApp";
import { useApplication } from "../../../hooks/useApplication";
import MyModal from "../Modal/Modal";


export const ApplicationStatusSelector: React.FC<{applicationId: number, defaultValue: string}> = 
  ({applicationId, defaultValue}) => {

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalText, setModalText] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalVariant, setModalVariant] = useState('');
  const [modalCanselText, setModalCanselText] = useState('');
  const [modalSaveText, setModalSaveText] = useState('');

  const { updateApplicationStatus } = useApplication();

  const handleStatusChange = (status: string) => {
    // сделать под модератора на бэке
    updateApplicationStatus(applicationId, status)
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

        setModalTitle('Статус обновлен');
        setModalText('')
        setModalError('');
        setModalCanselText('');
        setModalSaveText('');
        setModalVariant('withProgress');
        setModalShow(true);
      })
      .catch(error => {
        setModalTitle('Ошибка');
        setModalText('Детали ошибки')
        setModalError(error);
        setModalCanselText('Закрыть');
        setModalVariant('');
        setModalShow(true);
      });
  }

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
        onHide={() => {
          setModalTitle('');
          setModalText('');
          setModalError('');
          setModalVariant('');
          setModalCanselText('');
          setModalSaveText('');
          setModalShow(false);
        }}
      />
    );
  }

  return (
    <Form.Select defaultValue={defaultValue} 
    onChange={(event) => handleStatusChange(event.target.value)}>
      <option value="" disabled hidden>Выберите новый статус заявки</option>
      <option value="В разработке">В разработке</option>
      <option value="На рассмотрении">На рассмотрении</option>
      <option value="Одобрена">Одобрена</option>
      <option value="Отклонена">Отклонена</option>
    </Form.Select>
  );
}

export function ApplicationFeedStatusFilterSelector() {
  const { moderatorApplicationFeedStatusFilter,
    setModeratorApplicationFeedStatusFilter,
    deleteModeratorApplicationFeedStatusFilter,
  } = useApp();

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      return setModeratorApplicationFeedStatusFilter(event.target.value);
    }

    return deleteModeratorApplicationFeedStatusFilter();
  }

  return (
    <Form.Select defaultValue={moderatorApplicationFeedStatusFilter} 
    onChange={handleStatusChange}>
      <option value="">Все статусы</option>
      <option value="В разработке">В разработке</option>
      <option value="На рассмотрении">На рассмотрении</option>
      <option value="Одобрена">Одобрена</option>
      <option value="Отклонена">Отклонена</option>
    </Form.Select>
  );
}

