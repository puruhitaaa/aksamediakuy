import React, { useEffect, useState } from "react";

import type { User } from "@/types/auth";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditUser: (user: User | null) => void;
  user: User | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onEditUser,
  user,
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(user ?? null);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(
      (prevUser) =>
        ({
          ...prevUser,
          [name]: value,
        }) as User,
    );
  };

  const handleEditUser = () => {
    onEditUser(editedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-6 shadow-lg dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
          Edit User
        </h2>
        <input
          type="text"
          name="fullName"
          value={editedUser?.fullName}
          placeholder="Full name"
          className="mb-2 w-full rounded border px-3 py-2 text-gray-900 dark:bg-transparent dark:text-gray-50"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          value={editedUser?.username}
          placeholder="Username"
          className="mb-2 w-full rounded border px-3 py-2 text-gray-900 dark:bg-transparent dark:text-gray-50"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          value={editedUser?.email}
          placeholder="Email"
          className="mb-2 w-full rounded border px-3 py-2 text-gray-900 dark:bg-transparent dark:text-gray-50"
          onChange={handleInputChange}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleEditUser}
            className="mt-4 w-fit rounded bg-blue-500 px-4 py-2 text-white"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="mt-4 w-fit rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
