import { darkModeAtom } from "@/atoms/darkMode";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { useEffect, useState } from "react";

export default function Header() {
  const { logout, user } = useAuth();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isModeSwitchOpen, setIsModeSwitchOpen] = useState(false);
  const { navigate } = useRouter();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const handleLogout = () => {
    logout();

    navigate({ to: "/sign-in", replace: true });
  };

  const handleDarkModeChange = (mode: string) => {
    // @ts-ignore
    setDarkMode(mode);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode === "dark") {
      root.classList.add("dark");
    } else if (darkMode === "light") {
      root.classList.remove("dark");
    } else if (darkMode === "system") {
      root.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    }
  }, [darkMode]);

  return (
    <header className="h-20 bg-gray-200 dark:bg-gray-700">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link to="/" className="text-xl md:text-3xl">
          ⚡
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                className="inline-flex gap-2"
                onClick={() => setIsModeSwitchOpen(!isModeSwitchOpen)}
              >
                Theme
                <Chevron
                  className={cn("h-6 w-6 transition-transform ease-out", {
                    "rotate-180": isModeSwitchOpen,
                  })}
                />
              </button>
              {isModeSwitchOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800">
                  <button
                    className="inline-flex w-full items-center gap-2 rounded px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => handleDarkModeChange("light")}
                  >
                    <Sun className="h-3 w-3" />
                    Light
                  </button>
                  <button
                    className="inline-flex w-full items-center gap-2 rounded px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => handleDarkModeChange("dark")}
                  >
                    <Moon className="h-3 w-3" />
                    Dark
                  </button>
                  <button
                    className="inline-flex w-full items-center gap-2 rounded px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => handleDarkModeChange("system")}
                  >
                    System
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="inline-flex gap-2"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              >
                {user.fullName}{" "}
                <Chevron
                  className={cn("h-6 w-6 transition-transform ease-out", {
                    "rotate-180": isOptionsOpen,
                  })}
                />
              </button>
              {isOptionsOpen ? (
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
            </div>
          </div>
        ) : null}
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

function Sun({ className, ...rest }: React.HTMLAttributes<HTMLOrSVGElement>) {
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
      className={cn("lucide lucide-sun", className)}
      {...rest}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

function Moon({ className, ...rest }: React.HTMLAttributes<HTMLOrSVGElement>) {
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
      className={cn("lucide lucide-moon", className)}
      {...rest}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
