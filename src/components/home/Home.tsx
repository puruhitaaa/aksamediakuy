import { tableHeaders } from "@/static/users";
import AlertDialog from "../ui/alert-dialog";
import { useAtom } from "jotai/react";
import { useEffect, useState } from "react";
import { usersAtom } from "@/atoms/users";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import type { User } from "@/types/auth";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import { useDebounce } from "use-debounce";

function Home() {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  const [users, setUsers] = useAtom(usersAtom);
  const [rowsLimit, _setRowsLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // @ts-ignore
  const [searchQuery, setSearchQuery] = useState(search.query ?? "");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      navigate({
        search: {
          ...search,
          page: nextPage,
        },
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate({
        search: {
          ...search,
          page: prevPage,
        },
      });
    }
  };

  const handleAddUser = (user: Partial<User>) => {
    // @ts-ignore
    setUsers([...users, user]);
    setShowAddModal(false);

    alert("User added!");
  };

  const handleEditUser = (updatedUser: User | null) => {
    setUsers(
      // @ts-ignore
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setShowEditModal(false);
    alert("User edited!");
  };

  const handleEditButtonClick = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = () => {
    setUsers(users?.filter((user) => user.id !== selectedUser?.id) ?? null);

    setShowAlertDialog(false);
    setSelectedUser(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayedUsers =
    filteredUsers?.slice(
      (currentPage - 1) * rowsLimit,
      currentPage * rowsLimit,
    ) ?? [];

  const totalPages = Math.ceil(users?.length! / rowsLimit);

  useEffect(() => {
    if (debouncedSearchQuery === "") {
      navigate({
        search: {
          ...search,
          query: undefined,
        },
      });
    } else {
      navigate({
        search: {
          ...search,
          query: debouncedSearchQuery,
        },
      });
    }
  }, [debouncedSearchQuery, navigate, search]);

  useEffect(() => {
    // @ts-ignore
    const page = parseInt(search.page || "1", 10);
    setCurrentPage(page);
  }, [search]);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by username..."
            className="rounded-md border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearchQuery("")}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            Clear
          </button>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-700"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((value, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {value}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-gray-50">
            {displayedUsers.length ? (
              displayedUsers.map((user, index) => (
                <tr key={index}>
                  {Object.values(user).map((value, idx) => (
                    <td
                      key={idx}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >
                      {value}
                    </td>
                  ))}
                  <td>
                    <button
                      className="ml-2 rounded bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition-colors ease-out hover:bg-yellow-700"
                      onClick={() => handleEditButtonClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors ease-out hover:bg-red-700"
                      onClick={() => {
                        setShowAlertDialog(true);
                        setSelectedUser(user);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddUser={(user) => handleAddUser(user)}
        />

        <EditUserModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onEditUser={handleEditUser}
          user={selectedUser}
        />

        <AlertDialog
          isOpen={showAlertDialog}
          onClose={() => setShowAlertDialog(false)}
          onConfirm={() => handleDeleteUser()}
          message="Are you sure you want to delete this user?"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors ease-out hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-50">
          Page {currentPage} of{" "}
          {searchQuery
            ? Math.ceil(displayedUsers.length / rowsLimit)
            : totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors ease-out hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
