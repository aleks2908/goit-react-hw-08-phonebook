// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy } from 'react';
// import { fetchContacts } from 'redux/operations';
import { RotatingLines } from 'react-loader-spinner';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from '../components/ContactList/ContactList';
import css from '../components/App/App.module.css';

import { Route, Routes } from 'react-router-dom';
// import { Layout } from '../Layout';
// import { PrivateRoute } from '../PrivateRoute';
// import { RestrictedRoute } from '../RestrictedRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';

/*=====================================================*/

// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchContacts } from 'redux/operations';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
// import { TaskList } from 'components/TaskList/TaskList';
// import { TaskEditor } from 'components/TaskEditor/TaskEditor';
// import { fetchTasks } from 'redux/tasks/operations';
// import { selectLoading } from 'redux/tasks/selectors';

export default function Contacts() {
  const dispatch = useDispatch();
  // const isLoading = useSelector(selectLoading);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <ContactForm />
      <h3 style={{ textAlign: 'center' }}>
        {/* backgroundColor: 'red' */}
        Contacts: {contacts.length}
      </h3>
      {/* <div style={{ position: 'relative' }}> */}
      <Filter />
      {/* </div> */}
      {error && (
        <p>
          Sorry, the request ended with the following error: <b>{error}</b>{' '}
          <br />
          Please try again later.
        </p>
      )}

      <ContactList />
    </div>
  );
}
