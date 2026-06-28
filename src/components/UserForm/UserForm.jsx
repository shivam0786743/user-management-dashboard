import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { DEPARTMENTS } from '../../constants/departments';

/**
 * UserForm modal component.
 * Dual-role form used for adding or editing users.
 * Performs real-time schema validation and handles saving indicators.
 */
const UserForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  existingUsers = [],
}) => {
  const isEditMode = !!initialData;

  // Dynamically build the validation schema to check for email uniqueness
  const schema = useMemo(() => {
    return yup.object().shape({
      firstName: yup
        .string()
        .trim()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be under 50 characters'),
      lastName: yup
        .string()
        .trim()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be under 50 characters'),
      email: yup
        .string()
        .trim()
        .required('Email address is required')
        .email('Please enter a valid email address')
        .test('unique-email', 'This email address is already registered', (value) => {
          if (!value) return true;
          const emailLower = value.trim().toLowerCase();
          return !existingUsers.some((u) => {
            // If in edit mode, ignore the user currently being edited
            if (isEditMode && u.id === initialData.id) {
              return false;
            }
            return u.email.trim().toLowerCase() === emailLower;
          });
        }),
      department: yup
        .string()
        .required('Department is required'),
    });
  }, [existingUsers, isEditMode, initialData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    },
  });

  // Sync form defaults when modal toggles or edit target transitions
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          department: initialData.department || '',
        });
      } else {
        reset({
          firstName: '',
          lastName: '',
          email: '',
          department: '',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const onFormSubmit = (data) => {
    // Perform final trims prior to calling onSubmit
    const cleaned = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      department: data.department,
    };

    if (isEditMode) {
      cleaned.id = initialData.id;
    }

    onSubmit(cleaned);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit User Profile' : 'Add New User'}
      size="sm"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
        <Input
          label="First Name"
          id="user-firstName"
          required
          error={errors.firstName?.message}
          placeholder="e.g. Sarah"
          {...register('firstName')}
        />

        <Input
          label="Last Name"
          id="user-lastName"
          required
          error={errors.lastName?.message}
          placeholder="e.g. Conner"
          {...register('lastName')}
        />

        <Input
          label="Email Address"
          id="user-email"
          type="email"
          required
          error={errors.email?.message}
          placeholder="e.g. sarah.conner@skynet.com"
          {...register('email')}
        />

        <Input
          label="Department"
          id="user-department"
          type="select"
          required
          error={errors.department?.message}
          {...register('department')}
        >
          <option value="">Select a department</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </Input>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 mt-4 pt-3.5 border-t border-slate-200 dark:border-zinc-800">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            {isEditMode ? 'Save Changes' : 'Create User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
