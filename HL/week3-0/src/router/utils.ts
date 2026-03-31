export const getCurrentPath = (): string => window.location.pathname;

export const navigateTo = (to: string): void => {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("pushstate"));
};