import { useEffect } from 'react';
import { selectContacts, selectError } from 'redux/selectors';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { Filter } from '../../components/Filter/Filter';
import { ContactList } from '../../components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import css from './Contacts.module.css';

export default function Contacts() {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <ContactForm />
      <h3 style={{ textAlign: 'center' }}>Contacts: {contacts.length}</h3>
      <Filter />
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
