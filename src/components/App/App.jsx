import 'modern-normalize';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { RotatingLines } from 'react-loader-spinner';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <ContactForm />
      <h3>Contacts: {contacts.length}</h3>
      <div style={{ position: 'relative' }}>
        <Filter />

        {isLoading && !error && (
          <b className={css.spiner}>
            <RotatingLines
              strokeColor="#757398"
              strokeWidth="5"
              animationDuration="0.75"
              width="60"
              visible={true}
            />
          </b>
        )}
      </div>
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
};
