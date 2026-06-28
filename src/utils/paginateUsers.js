/**
 * Paginates an array of users.
 * 
 * @param {Array} users - The array of users.
 * @param {number} currentPage - The current active page (1-indexed).
 * @param {number} pageSize - The number of users per page.
 * @returns {Array} The sliced segment of users for the current page.
 */
export const paginateUsers = (users, currentPage, pageSize) => {
  if (!users) return [];
  const startIndex = (currentPage - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  return users.slice(startIndex, endIndex);
};
