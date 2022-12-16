<template>
    <div class="products">
        <div class="product"
        @click="() => productClicked(product.id)"
        :style="{backgroundColor: product.color}" 
        :key="product.id" v-for="product in products">
          <span class="title">{{product.title}}</span>
        </div>
    </div>
  </template>
  
  <script>
  import { productsQuery } from '../graphql/products'
  
  export default {
    name: 'App',
    inject: ['apollo'],
    data(){
      return {
        products: []
      }
    },
    methods: {
      productClicked(id){
        this.$router.push(`/product/${id}`)
      }
    },
    mounted(){    
      this.apollo.defaultClient.query(productsQuery)
        .then(({data}) => {
          this.products = data.products
        })
    }
  }
  </script>