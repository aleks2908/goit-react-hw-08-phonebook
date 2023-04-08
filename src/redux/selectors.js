import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilter = state => state.filter;

export const selectFilteredContactList = createSelector(
  [selectFilter, selectContacts],
  (filter, contacts) => {
    const filtredContacts = () => {
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    };
    return filtredContacts().sort((a, b) => a.name.localeCompare(b.name));
  }
);
