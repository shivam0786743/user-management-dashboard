/**
 * Filters the list of users based on a global search query and/or advanced filters.
 * All checks are case-insensitive and trimmed of whitespace.
 * 
 * @param {Array} users - The array of user objects.
 * @param {string} query - The global search query.
 * @param {Object} filters - Advanced filter criteria (firstName, lastName, email, department).
 * @returns {Array} The filtered array of users.
 */
export const filterUsers = (users, query, filters) => {
  if (!users) return [];

  return users.filter((user) => {
    // 1. Global search query check
    if (query) {
      const q = query.toLowerCase().trim();
      const matchSearch =
        (user.firstName || '').toLowerCase().includes(q) ||
        (user.lastName || '').toLowerCase().includes(q) ||
        (user.email || '').toLowerCase().includes(q) ||
        (user.department || '').toLowerCase().includes(q);

      if (!matchSearch) return false;
    }

    // 2. Advanced field filters check
    if (filters) {
      const { firstName, lastName, email, department } = filters;

      if (
        firstName &&
        !(user.firstName || '').toLowerCase().includes(firstName.toLowerCase().trim())
      ) {
        return false;
      }
      if (
        lastName &&
        !(user.lastName || '').toLowerCase().includes(lastName.toLowerCase().trim())
      ) {
        return false;
      }
      if (
        email &&
        !(user.email || '').toLowerCase().includes(email.toLowerCase().trim())
      ) {
        return false;
      }
      if (
        department &&
        department !== 'All' &&
        department !== '' &&
        (user.department || '').toLowerCase() !== department.toLowerCase().trim()
      ) {
        return false;
      }
    }

    return true;
  });
};
