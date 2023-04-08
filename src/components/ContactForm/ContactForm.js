import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, number } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const normalizedName = values.name.toLowerCase();
    const filtredContacts = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (filtredContacts) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    dispatch(
      addContact({
        // values,
        name: values.name,
        phone: values.number,
      })
    );

    resetForm();
  };

  const initialValues = { name: '', number: '' };

  const userSchema = object({
    name: string().required(),
    number: number().required().positive().integer(),
  });

  return (
    <>
      <h2>PhoneBook</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className={css.form}>
          <label>
            Name <br />
            <Field className={css.label} name="name" />
            <ErrorMessage className={css.error} component="div" name="name" />
          </label>
          <label>
            <br />
            Number <br />
            <Field className={css.label} name="number" />
            <ErrorMessage className={css.error} component="div" name="number" />
          </label>
          <br />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};
