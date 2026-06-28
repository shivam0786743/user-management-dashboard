import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { MOCK_USERS } from '../constants/mockUsers';
import { DEPARTMENTS } from '../constants/departments';

/**
 * Helper to split full name into firstName and lastName,
 * cleaning up prefixes like Mr., Mrs., Ms., Dr.
 */
const cleanNameAndSplit = (fullName) => {
  if (!fullName) return { firstName: '', lastName: '' };
  
  // Remove common prefixes case-insensitively
  const cleanName = fullName.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s+/i, '');
  const parts = cleanName.trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  
  return { firstName, lastName };
};

/**
 * Helper to return a random department.
 */
const getRandomDepartment = () => {
  const index = Math.floor(Math.random() * DEPARTMENTS.length);
  return DEPARTMENTS[index];
};

const INDIAN_API_NAMES = [
  "Amit Patel",
  "Bhavana Sharma",
  "Chaitanya Verma",
  "Deepa Nair",
  "Eshwar Rao",
  "Gaurav Sen",
  "Hari Krishnan",
  "Indu Iyer",
  "Jayesh Joshi",
  "Kriti Bhat"
];

/**
 * Custom Hook useUsers
 * Fetches user data, seeds with local mocks to allow proper testing of paginated state,
 * and maintains local React state for CRUD operations.
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users');
      
      // Transform API users to fit our schema
      const apiUsers = response.data.map((u, idx) => {
        const indianName = INDIAN_API_NAMES[idx] || u.name;
        const { firstName, lastName } = cleanNameAndSplit(indianName);
        return {
          id: u.id,
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@aura.in`,
          department: getRandomDepartment(),
        };
      });

      // Combine API-fetched users with local mock users to get 50 total records
      setUsers([...apiUsers, ...MOCK_USERS]);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(
        'Failed to fetch users. Please verify your network connection and click retry.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /**
   * Adds a user to local state after a simulated/real API call.
   */
  const addUser = useCallback(async (userData) => {
    setActionLoading(true);
    try {
      // Simulate real post request (JSONPlaceholder ignores new ID creation)
      await api.post('/users', userData);

      // Generate a new sequential unique ID
      const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const newUser = {
        ...userData,
        id: nextId,
      };

      // Prepend to display it at the top of the dashboard
      setUsers((prev) => [newUser, ...prev]);
      return newUser;
    } catch (err) {
      console.error('Error adding user:', err);
      throw new Error('Failed to add user. Please check your fields and try again.');
    } finally {
      setActionLoading(false);
    }
  }, [users]);

  /**
   * Edits a user.
   * Runs PUT for standard API users, simulates for mock users, then updates state.
   */
  const editUser = useCallback(async (updatedData) => {
    setActionLoading(true);
    try {
      if (updatedData.id <= 10) {
        await api.put(`/users/${updatedData.id}`, updatedData);
      } else {
        // Simulate network latency for mock users
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedData.id ? { ...u, ...updatedData } : u))
      );
    } catch (err) {
      console.error('Error updating user:', err);
      throw new Error('Failed to update user. Please check your connection and try again.');
    } finally {
      setActionLoading(false);
    }
  }, []);

  /**
   * Deletes a user.
   * Runs DELETE for standard API users, simulates for mock users, then updates state.
   */
  const deleteUser = useCallback(async (id) => {
    setActionLoading(true);
    try {
      if (id <= 10) {
        await api.delete(`/users/${id}`);
      } else {
        // Simulate network latency for mock users
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      throw new Error('Failed to delete user. Please check your connection and try again.');
    } finally {
      setActionLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    actionLoading,
    fetchUsers,
    addUser,
    editUser,
    deleteUser,
  };
};
