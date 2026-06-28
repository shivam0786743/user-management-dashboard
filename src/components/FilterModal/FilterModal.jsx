import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { DEPARTMENTS } from '../../constants/departments';

/**
 * FilterModal component.
 * Uses component composition with the reusable Modal and Input elements
 * to allow advanced field filtering.
 */
const FilterModal = ({ isOpen, onClose, currentFilters, onApply, onReset }) => {
  const [filters, setFilters] = useState(currentFilters);

  // Sync state whenever the modal opens or parent filter state updates
  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetState = {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    };
    setFilters(resetState);
    onReset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Advanced Filters" size="sm">
      <div className="flex flex-col gap-4">
        <Input
          label="First Name"
          id="filter-firstName"
          name="firstName"
          value={filters.firstName || ''}
          onChange={handleChange}
          placeholder="Filter by first name"
        />
        
        <Input
          label="Last Name"
          id="filter-lastName"
          name="lastName"
          value={filters.lastName || ''}
          onChange={handleChange}
          placeholder="Filter by last name"
        />
        
        <Input
          label="Email Address"
          id="filter-email"
          name="email"
          type="email"
          value={filters.email || ''}
          onChange={handleChange}
          placeholder="Filter by email"
        />
        
        <Input
          label="Department"
          id="filter-department"
          name="department"
          type="select"
          value={filters.department || ''}
          onChange={handleChange}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </Input>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 mt-4 pt-3.5 border-t border-slate-200 dark:border-zinc-800">
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
