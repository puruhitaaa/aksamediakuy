import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export default function Header() {
  const { logout, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { navigate } = useRouter();

  const handleLogout = () => {
    logout();

    navigate({ to: "/sign-in", replace: true });
  };

  return (
    <header className="h-20 bg-gray-200 dark:bg-gray-700">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-xl md:text-3xl">
          ⚡
        </Link>
        <div className="relative">
          {user ? (
            <>
              <button
                className="inline-flex gap-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.fullName}{" "}
                <Chevron
                  className={cn("h-6 w-6 transition-transform ease-out", {
                    "rotate-180": isDropdownOpen,
                  })}
                />
              </button>

              {isDropdownOpen ? (
                <div className="absolute right-0 top-10 flex w-32 flex-col gap-2 rounded-lg border bg-gray-50 p-2 dark:border-gray-50 dark:bg-gray-900">
                  <Link
                    to="/account"
                    className="w-full bg-transparent px-4 py-1.5 text-center text-sm text-yellow-500 transition-colors ease-out hover:text-yellow-700"
                  >
                    Account
                  </Link>
                  <button
                    className="w-full rounded-lg bg-red-500 px-4 py-1.5 text-sm text-gray-50 transition-colors ease-out hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function Chevron({
  className,
  ...rest
}: React.HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-chevron-down", className)}
      {...rest}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
