import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

// Lazy page imports
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardPage = lazy(() => import("./pages/Dashboard"));
const SubscribersPage = lazy(() => import("./pages/Subscribers"));
const CampaignsPage = lazy(() => import("./pages/Campaigns"));

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const subscribersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subscribers",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SubscribersPage />
    </Suspense>
  ),
});

const campaignsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/campaigns",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CampaignsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  subscribersRoute,
  campaignsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
