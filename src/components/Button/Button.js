import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({
  type = 'button',
  onClick = () => {},
  children = 'my button',
}) => {
  return (
    <button type={type} className={css.button} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
