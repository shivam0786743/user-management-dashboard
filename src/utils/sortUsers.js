/**
 * Sorts an array of users by a given key and direction (asc or desc).
 * Handles numeric values for 'id' and does case-insensitive string sorting for others.
 * 
 * @param {Array} users - The array of users.
 * @param {string} key - The user field to sort by (e.g., 'id', 'firstName', 'lastName', 'email', 'department').
 * @param {string} direction - Sort direction ('asc' or 'desc').
 * @returns {Array} The sorted user array.
 */
export const sortUsers = (users, key, direction) => {
  if (!users || !key) return users;

  return [...users].sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    // Handle null or undefined values
    if (valA === undefined || valA === null) valA = '';
    if (valB === undefined || valB === null) valB = '';

    // Handle numeric ID sorting
    if (key === 'id') {
      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return direction === 'asc' ? numA - numB : numB - numA;
      }
    }

    // Default string sorting
    const strA = String(valA).trim().toLowerCase();
    const strB = String(valB).trim().toLowerCase();

    if (direction === 'asc') {
      return strA.localeCompare(strB);
    } else {
      return strB.localeCompare(strA);
    }
  });
};
