import type { ComponentType } from "react";

interface RouteProps {
  path: string;
  component: ComponentType;
}

export function Route({ component: Component }: RouteProps) {
  return <Component />;
}