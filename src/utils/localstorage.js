export const addUsertoLocalStoarge = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem('token');
};
export const getUser = () => {
  const result = localStorage.getItem("user");
  // const token = localStorage.getItem('token');
  // const authorization = token ? JSON.parse(token):null;
  const user = result ? JSON.parse(result) : null;
  return user ;
};
