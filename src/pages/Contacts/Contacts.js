import { useEffect } from 'react';
import { selectContacts } from 'redux/selectors';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { Filter } from '../../components/Filter/Filter';
import { ContactList } from '../../components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import css from './Contacts.module.css';

export default function Contacts() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <ContactForm />
      <h3 className={css.title}>Contacts: {contacts.length}</h3>
      <Filter />
      <ContactList />
    </div>
  );
}
