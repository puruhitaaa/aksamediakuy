import { usersAtom } from "@/atoms/users";
import type { User } from "@/types/auth";
import { useAtomValue } from "jotai/react";
import React, { useState } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: Partial<User>) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const users = useAtomValue(usersAtom);
  const [user, setUser] = useState<Partial<User>>({});

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      id: (users?.length! + 1).toString(),
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    onAddUser(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-6 shadow-lg dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
          Add User
        </h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          className="mb-2 w-full rounded border px-3 py-2 text-gray-900 dark:bg-transparent dark:text-gray-50"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="mb-2 w-full rounded border px-3 py-2 text-gray-900 dark:bg-transparent dark:text-gray-50"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="mb-2 w-full rounded border px-3 py-2 text-gray-900 dark:bg-transparent dark:text-gray-50"
          onChange={handleInputChange}
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddUser}
            className="rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
