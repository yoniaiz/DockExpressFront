export const routes = {
  MAIN: "/",
  LOGIN: "/login",
  REGISTER: "/register"
};

export const headerNav = [
  {
    name: "כניסה",
    url: routes.LOGIN,
    authanticated: false
  },
  {
    name: "הרשמה",
    url: routes.REGISTER,
    authanticated: false
  }
];
