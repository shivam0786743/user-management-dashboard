import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useToast } from '../context/ToastContext';
import { filterUsers } from '../utils/filterUsers';
import { sortUsers } from '../utils/sortUsers';
import { paginateUsers } from '../utils/paginateUsers';
import Navbar from '../components/Navbar/Navbar';
import SearchBar from '../components/SearchBar/SearchBar';
import Button from '../components/Button/Button';
import Table from '../components/Table/Table';
import Card from '../components/Card/Card';
import Pagination from '../components/Pagination/Pagination';
import FilterModal from '../components/FilterModal/FilterModal';
import UserForm from '../components/UserForm/UserForm';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import EmptyState from '../components/EmptyState/EmptyState';
import { TableSkeleton, CardSkeleton } from '../components/Loader/Loader';
import { FiPlus, FiFilter, FiRefreshCw } from 'react-icons/fi';

/**
 * Dashboard page.
 * Orchestrates filtering, sorting, pagination, forms, dialogs, and loaders.
 */
const Dashboard = () => {
  const {
    users,
    loading,
    error,
    actionLoading,
    fetchUsers,
    addUser,
    editUser,
    deleteUser,
  } = useUsers();

  const toast = useToast();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  // Sort State
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'asc',
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals & Dialogs toggles
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState(null); // null = Add Mode, user object = Edit Mode
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Active filters tracker
  const activeFiltersCount = useMemo(() => {
    return Object.values(advancedFilters).filter(Boolean).length;
  }, [advancedFilters]);

  // Combined logic: 1. Filter, 2. Sort
  const processedUsers = useMemo(() => {
    const filtered = filterUsers(users, searchQuery, advancedFilters);
    return sortUsers(filtered, sortConfig.key, sortConfig.direction);
  }, [users, searchQuery, advancedFilters, sortConfig]);

  // 3. Paginate
  const paginatedUsers = useMemo(() => {
    return paginateUsers(processedUsers, currentPage, pageSize);
  }, [processedUsers, currentPage, pageSize]);

  // Adjust page number if items shrink (e.g. after a filter or deletion)
  const totalPages = Math.ceil(processedUsers.length / pageSize) || 1;
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [processedUsers.length, pageSize, currentPage, totalPages]);

  // Sort callback
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  // Search callback
  const handleSearch = useCallback((val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  }, []);

  // Reset Filters helper
  const handleClearFilters = () => {
    setSearchQuery('');
    setAdvancedFilters({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
    setCurrentPage(1);
    toast.showInfo('Filters cleared successfully.');
  };

  // Create or Update submit handler
  const handleFormSubmit = async (data) => {
    try {
      if (formInitialData) {
        await editUser(data);
        toast.showSuccess(`User "${data.firstName} ${data.lastName}" updated successfully!`);
      } else {
        await addUser(data);
        toast.showSuccess(`User "${data.firstName} ${data.lastName}" added successfully!`);
      }
      setIsFormOpen(false);
    } catch (err) {
      toast.showError(err.message || 'Operation failed.');
    }
  };

  // Delete submit handler
  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteUser(deleteTargetId);
      toast.showSuccess('User record deleted successfully.');
      setIsDeleteOpen(false);
    } catch (err) {
      toast.showError(err.message || 'Failed to delete user.');
    }
  };

  // Open modals helper
  const openAddForm = () => {
    setFormInitialData(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setFormInitialData(user);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  // Orchestrate layout blocks based on loading, errors, or matches
  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col gap-6">
          <div className="hidden md:block">
            <TableSkeleton rows={8} />
          </div>
          <div className="md:hidden">
            <CardSkeleton cards={6} />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl mx-auto shadow-sm">
          <div className="text-rose-500 dark:text-rose-400 mb-4 text-4xl">⚠️</div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Failed to Load Directory
          </h2>
          <p className="text-sm text-slate-505 dark:text-slate-400 mb-6 leading-relaxed">
            {error}
          </p>
          <Button variant="primary" icon={FiRefreshCw} onClick={fetchUsers}>
            Retry Fetching Users
          </Button>
        </div>
      );
    }

    if (processedUsers.length === 0) {
      return (
        <EmptyState
          iconType={searchQuery || activeFiltersCount > 0 ? 'search' : 'users'}
          onClearFilters={searchQuery || activeFiltersCount > 0 ? handleClearFilters : null}
        />
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {/* Desktop Table Layout */}
        <div className="hidden md:block">
          <Table
            users={paginatedUsers}
            onEdit={openEditForm}
            onDelete={openDeleteDialog}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>

        {/* Tablet/Mobile Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {paginatedUsers.map((user) => (
            <Card
              key={user.id}
              user={user}
              onEdit={openEditForm}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>

        {/* Shared Pagination controls */}
        <Pagination
          totalItems={processedUsers.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col pb-12 transition-colors duration-200">
      <Navbar totalUsers={users.length} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 flex-1 flex flex-col">
        
        {/* Header Section matching reference */}
        <div className="flex flex-col gap-1 text-left mb-6 select-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            User Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
            View, suspend, and manage user accounts
          </p>
        </div>

        {/* Card Container enclosing the controls and the directory list */}
        <div className="md:bg-white md:dark:bg-zinc-900 md:border md:border-slate-200 md:dark:border-zinc-800 md:rounded-xl md:shadow-sm md:p-6 flex flex-col gap-6">
          
          {/* Card Header controls */}
          <div className="flex flex-col md:flex-row gap-4 items-slate-stretch md:items-center md:justify-between border-b border-slate-100 dark:border-zinc-800/60 pb-5">
            {/* Left side: Active count badge */}
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-150 dark:border-blue-900/50 text-blue-650 dark:text-blue-400 font-semibold text-xs select-none">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                All ({users.length})
              </div>
            </div>

            {/* Right side: Search + Filter + Add */}
            <div className="flex flex-wrap items-center gap-2">
              <SearchBar
                value={searchQuery}
                onSearch={handleSearch}
              />
              <Button
                variant="secondary"
                icon={FiFilter}
                onClick={() => setIsFilterOpen(true)}
                className="relative !py-1.5 !px-3 !text-xs !font-medium"
              >
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center font-semibold rounded-full border border-white dark:border-zinc-900 shadow-sm">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              <Button variant="primary" icon={FiPlus} onClick={openAddForm} className="!py-1.5 !px-3 !text-xs !font-medium">
                Add User
              </Button>
            </div>
          </div>

          {/* Directory Content */}
          <div className="flex-1">
            {renderDashboardContent()}
          </div>
        </div>

        {/* Portal Modals & Overlays */}
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          currentFilters={advancedFilters}
          onApply={(filters) => {
            setAdvancedFilters(filters);
            setCurrentPage(1);
          }}
          onReset={() => {
            setAdvancedFilters({
              firstName: '',
              lastName: '',
              email: '',
              department: '',
            });
            setCurrentPage(1);
          }}
        />

        <UserForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={formInitialData}
          isLoading={actionLoading}
          existingUsers={users}
        />

        <ConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          isLoading={actionLoading}
        />
      </main>
    </div>
  );
};

export default Dashboard;
