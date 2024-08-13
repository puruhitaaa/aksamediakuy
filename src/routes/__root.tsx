import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";

export const Route = createRootRoute({
  component: () => (
    <main>
      <Outlet />
    </main>
  ),
});
