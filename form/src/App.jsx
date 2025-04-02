import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    priority: 'Basse',
    isCompleted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis :', formData);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Ajouter une tâche</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDueDate">
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIsCompleted">
          <Form.Check
            type="checkbox"
            name="isCompleted"
            label="Tâche complétée"
            checked={formData.isCompleted}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter la tâche
        </Button>
      </Form>
    </Container>
  );
}

export default App;
