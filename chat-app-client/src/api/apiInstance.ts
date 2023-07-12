import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;





// import axios from "axios";

// const baseURL = process.env.BASE_URL;

// const token =
//   typeof window !== "undefined" ? localStorage.getItem("token") : null;


// const apiInstance = axios.create({
//   baseURL: `${baseURL}`,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// });

// // Add an interceptor to include the token in the headers
// apiInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// export default apiInstance;

