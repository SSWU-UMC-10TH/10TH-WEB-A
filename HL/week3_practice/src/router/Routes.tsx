import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ReactElement } from "react";
import { useCurrentPath } from "./useCurrentPath";

interface RouteProps {
  path: string;
  component: React.ComponentType;
}

interface RoutesProps {
  children: ReactNode;
}

export function Routes({ children }: RoutesProps) {
  const currentPath = useCurrentPath();

  const routes = Children.toArray(children).filter(isValidElement) as ReactElement<RouteProps>[];

  const activeRoute =
    routes.find((route) => route.props.path === currentPath) ||
    routes.find((route) => route.props.path === "*");

  if (!activeRoute) return null;

  return cloneElement(activeRoute);
}