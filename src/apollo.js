import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql', // 你的GraphQL服务器地址
    cache: new InMemoryCache(),
});

export default client;
