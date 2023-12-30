import { Form } from "react-bootstrap";

function ApplicationStatusSelector() {
  return (
    <Form.Select>
      <option value="На рассмотрении">На рассмотрении</option>
      <option value="Решение принято">Решение принято</option>
    </Form.Select>
  );
}

export default ApplicationStatusSelector;
