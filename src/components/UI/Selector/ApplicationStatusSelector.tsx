import { Form } from "react-bootstrap";
import { useState, useEffect, ChangeEvent } from "react";

import { useApp } from "../../../hooks/useApp";


export function ApplicationStatusSelector() {
  return (
    <Form.Select defaultValue="">
      <option value="" disabled hidden>Выберите новый статус заявки</option>
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

