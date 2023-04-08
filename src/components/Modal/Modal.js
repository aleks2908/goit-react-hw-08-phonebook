import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ children, modalShoudClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        modalShoudClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalShoudClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      modalShoudClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  modalShoudClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
