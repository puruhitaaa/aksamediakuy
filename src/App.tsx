import { RouterProvider } from "@tanstack/react-router";

import { router } from "./router";

function InnerApp() {
  return <RouterProvider router={router} />;
}

export default function App() {
  return <InnerApp />;
}
