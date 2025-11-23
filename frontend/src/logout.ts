export const logout = (): void => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
