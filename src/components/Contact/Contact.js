import React from 'react';
import css from './Contact.module.css';
import PropTypes from 'prop-types';

export const Contact = ({ contact, showModal, showEditModal }) => {
  const phoneNumber = `tel:${contact.number}`;

  return (
    <>
      <td>{contact.name}</td>
      <td>
        <a href={phoneNumber}>{contact.number}</a>
      </td>
      <td
        onClick={() => showModal(contact.id, contact.name)}
        className={css.deleteButton}
        id={contact.id}
      >
        Delete
      </td>
      <td
        onClick={() => showEditModal(contact.id, contact.name, contact.number)}
        className={css.deleteButton}
        id={contact.id}
      >
        Edit
      </td>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  showEditModal: PropTypes.func.isRequired,
};
