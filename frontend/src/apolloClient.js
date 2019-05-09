import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";

const httpLink = new HttpLink({ uri: "http://localhost:5000/graphiql" });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("jwt");

  // Use the setContext method to set the HTTP headers.
  console.log(`${token}`);
  operation.setContext({
    headers: {
      Authorization: token ? `${token}` : ""
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache()
});

export default client;
