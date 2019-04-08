// api/interceptors.js
export const requestInterceptorA = (config) => {
  // Set custom headers, etc.
  const token = localStorage.getItem('jwt');

  if (token) {
    config.headers.Authorization  = token;
  }
  return config
};
// export const requestInterceptorB = (config) => { ... };
// export const responseInterceptorA = (response) => {
//   // Log data, etc.
// };
// export const responseInterceptorB = (response) => { ... };
