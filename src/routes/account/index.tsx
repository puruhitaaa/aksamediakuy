import { userAtom } from "@/atoms/auth";
import Header from "@/components/Header";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { useState } from "react";

export const Route = createFileRoute("/account/")({
  component: Account,
  beforeLoad: ({ location }) => {
    if (!JSON.parse(localStorage.getItem("user") as string)) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function Account() {
  const [user, setUser] = useAtom(userAtom);
  const [fullName, setFullName] = useState(user?.fullName ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fullName.trim() === "") {
      alert("Please enter your full name");
      return;
    }

    setUser({
      ...JSON.parse(localStorage.getItem("user") as string),
      fullName,
    });

    alert("Account updated successfully");
  };

  return (
    <>
      <Header />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-50">
            Account
          </h2>
        </div>

        <form
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                id="fullName"
                required
                name="fullName"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
