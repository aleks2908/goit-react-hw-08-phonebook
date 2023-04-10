import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import {
  selectContacts,
  selectFilter,
  selectFilteredContactList,
} from '../../redux/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const value = useSelector(selectFilter);
  const filteredContactsLength = useSelector(selectFilteredContactList).length;
  const contactsLength = useSelector(selectContacts).length;

  const dispatch = useDispatch();

  const changeFieldFilter = e => dispatch(changeFilter(e.currentTarget.value));

  return (
    <div className={css.filter}>
      <label>
        Find contacts by name
        {filteredContactsLength !== contactsLength && (
          <>
            :&nbsp;<b>{filteredContactsLength}</b>
          </>
        )}
        <br />
        <input
          className={css.formInput}
          value={value}
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={changeFieldFilter}
        />
      </label>
    </div>
  );
};
