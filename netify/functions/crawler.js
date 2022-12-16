const gql = require('graphql-tag');
const { ApolloClient, createHttpLink, InMemoryCache } = require('@apollo/client/core');
const fetch = require("node-fetch");

const cache = new InMemoryCache()

const httpLink = createHttpLink({
    uri: 'https://api-us-west-2.hygraph.com/v2/clbok5yaf0eqw01t7ce42f7dl/master',
    fetch
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

const crawlerQuery = {
    query: gql`query {
        products {
            id,
            title,
            price
        }
    }`
}

exports.hander = async (event, context) => {
    try {
        const { data } = await apolloClient.query(crawlerQuery);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'aplication/json',
            },
            body: JSON.stringify(data.products)
        };
    }
    catch (error) {

        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetchingdata' }),
        };
    }
};