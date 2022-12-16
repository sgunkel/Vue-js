<template>
    <div class="wrapper">
      <router-link class="home" to="/">🌈</router-link>
      <div class="product" v-if="product">
        <div class="description">{{product.description}}</div>
        <div class="buy_button snipcart-add-item"
          :data-item-id="product.id"
          :data-item-price="product.price" 
          :data-item-description="product.description" 
          :data-item-image="product.image.url" 
          :data-item-name="product.title" 
          data-item-quantity="1"
          :data-item-url="${baseUrl}/.netlify/functions/crawler"
          data-item-custom1-name="variants"
          :data-item-custom1-options="customFieldsOptions"
        >
          Buy
          <span class="hidden_title" :style="{color: product.title}" >&nbsp;{{product.title}}&nbsp;<br/></span>
          {{product.price}}$
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { productQuery } from '../graphql/products'
  
  export default {
    name: 'App',
    inject: ['apollo'],
    props: ['id'],
    data(){
      return {
        product: null,
        customFieldsOptions: ''
      }
    },
    mounted(){
      this.apollo.defaultClient.query(productQuery(this.$route.params.id))
        .then(({data}) => {
          this.product = data.product
  
          this.customFieldsOptions = data.product.customFields.variants
            .reduce((options, option) => options.concat(`|${option}`),'')
  
          window.document.documentElement.style.setProperty('--product-color', data.product.color)
        })
    }
  }
  </script>