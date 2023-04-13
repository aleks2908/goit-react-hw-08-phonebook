import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import css from './LoginForm.module.css';
import { Button } from 'components/Button/Button';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    );
    resetForm();
  };

  const initialValues = { email: '', password: '' };

  const userSchema = object({
    email: string().email('Invalid email address').required(),
    password: string().min(5).required(),
  });

  return (
    <div className={css.formWrapper}>
      <h2 className={css.formTitle}>Login form</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form className={css.form} autoComplete="off">
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
          <Button type="submit">Log in</Button>
        </Form>
      </Formik>
    </div>
  );
};
