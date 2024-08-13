import Header from "@/components/Header";

import { createFileRoute, redirect } from "@tanstack/react-router";

import HomeComponent from "@/components/home/Home";

export const Route = createFileRoute("/")({
  component: Home,
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

function Home() {
  return (
    <div>
      <Header />
      <HomeComponent />
    </div>
  );
}
