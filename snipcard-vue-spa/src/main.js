import { createApp } from 'vue'
import App from './App.vue'

import { ApolloClient, creacteHttpLink, InMemoryCache } from '@apollo/client/core'
import VueApollo from '@vue/apollo-option'
import ProductComponent from './components/Product'
import ProductsComponent from './components/Products'
import { createRouter, createWebHashHistory } from 'vue-router'

const httpLink = creacteHttpLink({
    uri: 'https://api-us-west-2.hygraph.com/v2/clbok5yaf0eqw01t7ce42f7dl/master',
})

// Cache implementation.
const cache = new InMemoryCache()

// Create the apollor client.
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

const routes = [
    {
        path: '/',
        component: ProductsComponent
    },
    {
        path: '/product/:id',
        component: ProductComponent
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

createApp(App)
    .use(router)
    .provide('apollo', apolloProvider)
    .mount('#app')
