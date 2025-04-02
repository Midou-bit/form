import { useForm } from 'react-hook-form';
import { Container, Form, Button } from 'react-bootstrap';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      dueDate: '',
      priority: 'Basse',
      isCompleted: false
    }
  });

  const onSubmit = (data) => {
    console.log('Donnees du formulaire :', data);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Ajouter une tâche</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            {...register('name', { required: true })}
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">
            Ce champ est requis.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDueDate">
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="date"
            {...register('dueDate', { required: true })}
            isInvalid={errors.dueDate}
          />
          <Form.Control.Feedback type="invalid">
            Ce champ est requis.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register('priority')}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIsCompleted">
          <Form.Check
            type="checkbox"
            label="Tâche complétée"
            {...register('isCompleted')}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter la tache
        </Button>
      </Form>
    </Container>
  );
}

export default App;
