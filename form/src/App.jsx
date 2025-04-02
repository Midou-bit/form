import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Form, Button } from 'react-bootstrap';
import dayjs from 'dayjs';

const today = dayjs().format('DD/MM/YYYY');

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, 'Le nom doit contenir au moins 8 caractères.')
    .max(15, 'Le nom ne peut pas dépasser 15 caractères.')
    .required('Le nom est requis.'),
  dueDate: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Format attendu : jj/mm/aaaa')
    .test('valid-date', 'La date ne peut pas être antérieure à aujourd’hui.', (value) => {
      if (!value) return false;
      const [jour, mois, annee] = value.split('/');
      const date = dayjs(`${annee}-${mois}-${jour}`);
      return date.isValid() && date.isSameOrAfter(dayjs(), 'day');
    })
    .required('La date est requise.'),
  priority: yup
    .string()
    .oneOf(['Basse', 'Moyenne', 'Elevée'], 'La priorité doit être Basse, Moyenne ou Elevée.'),
  isCompleted: yup.boolean().required()
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      dueDate: '',
      priority: 'Basse',
      isCompleted: false
    }
  });

  const onSubmit = (data) => {
    console.log('Formulaire validé :', data);
    reset();
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Ajouter une tâche</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            {...register('name')}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="text"
            placeholder="jj/mm/aaaa"
            {...register('dueDate')}
            isInvalid={!!errors.dueDate}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dueDate?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Priorité</Form.Label>
          <Form.Select {...register('priority')}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
          <div className="text-danger">{errors.priority?.message}</div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Tâche complétée"
            {...register('isCompleted')}
            isInvalid={!!errors.isCompleted}
          />
          <div className="text-danger">{errors.isCompleted?.message}</div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter la tâche
        </Button>
      </Form>
    </Container>
  );
}

export default App;
