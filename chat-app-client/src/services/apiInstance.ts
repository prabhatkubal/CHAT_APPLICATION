import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let path;

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL server URL
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  if (typeof window !== "undefined") {
    path = window.location.pathname;
  }
  return {
    headers: {
      ...headers,
      clientpathname: path,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
