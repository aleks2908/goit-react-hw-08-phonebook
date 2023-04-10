import { useDispatch, useSelector } from 'react-redux';
import { register } from 'redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import css from './RegisterForm.module.css';
import { selectAuthError } from 'redux/auth/selectors';
// import { useAuth } from 'hooks';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const authError = useSelector(selectAuthError);
  // console.log('authError: ', authError);

  const handleSubmit = (values, { resetForm }) => {
    // console.log('values: ', values);
    // e.preventDefault();
    // const form = e.currentTarget;

    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
    resetForm();
  };

  const initialValues = { name: '', email: '', password: '' };

  const userSchema = object({
    name: string().required(),
    email: string().email('Invalid email address').required(),
    password: string().min(5).required(),
  });

  return (
    <div className={css.formWrapper}>
      <h2 className={css.formTitle}>Registration form</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className={css.form} autoComplete="off">
          <div className={css.formInputGroup}>
            <Field
              className={css.formInput}
              type="text"
              name="name"
              placeholder="name"
            />
            <ErrorMessage className={css.error} component="div" name="name" />
          </div>

          <div className={css.formInputGroup}>
            <Field
              className={css.formInput}
              type="email"
              name="email"
              placeholder="email"
            />
            <ErrorMessage className={css.error} component="div" name="email" />
          </div>

          <div className={css.formInputGroup}>
            <Field
              className={css.formInput}
              type="password"
              name="password"
              placeholder="password"
            />
            <ErrorMessage
              className={css.error}
              component="div"
              name="password"
            />
          </div>

          <button className={css.button} type="submit">
            Register
          </button>
        </Form>
      </Formik>
      {authError && <b>User creation error. Please enter valid data.</b>}
    </div>
  );
};
