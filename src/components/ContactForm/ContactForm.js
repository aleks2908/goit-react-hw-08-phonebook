import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, number } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import { ThreeDots } from 'react-loader-spinner';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
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
        name: values.name,
        number: values.number,
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
    <div className={css.formWrapper}>
      <h2 className={css.formTitle}>PhoneBook</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className={css.form} autoComplete="on">
          <div className={css.formInputGroup}>
            <Field className={css.formInput} name="name" placeholder="name" />
            <ErrorMessage className={css.error} component="div" name="name" />
          </div>
          <div className={css.formInputGroup}>
            <Field
              className={css.formInput}
              name="number"
              placeholder="number"
            />
            <ErrorMessage className={css.error} component="div" name="number" />
          </div>

          <button className={css.button} type="submit">
            {/* Add contact */}
            {isLoading && !error ? (
              <ThreeDots
                height="22"
                width="60"
                // radius="30"
                color="gray"
                ariaLabel="three-dots-loading"
                // wrapperStyle={{}}
                // wrapperClassName=""
                visible={true}
              />
            ) : (
              <p>Add contact</p>
            )}
          </button>
          {/* <button className={css.button} type="submit">
            Add contact
          </button> */}
        </Form>
      </Formik>
    </div>
  );
};