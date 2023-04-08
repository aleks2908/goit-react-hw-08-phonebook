import React from 'react';
import css from './Contact.module.css';
import PropTypes from 'prop-types';

export const Contact = ({ contact, showModal }) => {
  const phoneNumber = `tel:${contact.phone}`;
  return (
    <>
      <td>{contact.name}</td>
      <td>
        <a href={phoneNumber}>{contact.phone}</a>
      </td>
      <td
        onClick={() => showModal(contact.id, contact.name)}
        className={css.deleteButton}
        id={contact.id}
      >
        Delete
      </td>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
};
