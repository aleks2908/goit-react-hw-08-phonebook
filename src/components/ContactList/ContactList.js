import React, { useState } from 'react';
import { Contact } from '../Contact/Contact';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/operations';
import css from './ContactList.module.css';
import { selectFilteredContactList } from 'redux/selectors';
import { Modal } from 'components/Modal/Modal';

let contactNameToDelete = '';

export const ContactList = () => {
  const [shownModal, setShownModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const dispatch = useDispatch();

  const shouldDeleteContact = value => {
    if (value) {
      dispatch(deleteContact(idToDelete));
    }
    modalShoudClose();
  };

  const showModal = (contactId, contactName) => {
    contactNameToDelete = contactName;
    setShownModal(true);
    setIdToDelete(contactId);
  };

  const modalShoudClose = () => {
    setShownModal(false);
  };

  const filteredContactList = useSelector(selectFilteredContactList);

  return (
    <>
      <table className={css.contactListTable}>
        <tbody>
          {filteredContactList.map(contact => (
            <tr key={contact.id} className={css.contactListItem}>
              <Contact contact={contact} showModal={showModal} />
            </tr>
          ))}
        </tbody>
      </table>

      {shownModal && (
        <Modal modalShoudClose={modalShoudClose}>
          <>
            <p>
              Do you really want to remove <br /> {contactNameToDelete}?
            </p>

            <button
              type="button"
              className={css.button}
              onClick={() => shouldDeleteContact(true)}
            >
              ok
            </button>
            <button
              type="button"
              className={css.button}
              onClick={() => shouldDeleteContact(false)}
            >
              cancel
            </button>
          </>
        </Modal>
      )}
    </>
  );
};
