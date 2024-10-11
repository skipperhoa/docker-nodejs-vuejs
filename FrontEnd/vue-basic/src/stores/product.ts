import { defineStore } from 'pinia'
import axios from 'axios'
export const useProductStore = defineStore('product', {
   state:()=>{
     return {
       products: [],
       perPage: 5,
       currentPage: 1,
       totalPages: 0
     }
   },
   getters: {
     all(state){
       return state.products
     },
     total(state){
       return state.totalPages
     }
   },
   actions:{
     getProducts(){
        axios.get('https://dummyjson.com/products').then((response) => {
          console.log("products",response.data.products)
          this.totalPages = response.data.products.length / this.perPage
          this.pagination(1)
        })
      },
      pagination(page : number){
       axios.get('https://dummyjson.com/products/?limit='+this.perPage+'&skip='+((page-1)*this.perPage)+
      '&select=title,thumbnail,price,rating,category,description,meta,reviews,id,sku').then((response) => {
         console.log("pagination",response.data.products)
         let data = response.data.products;
         this.products = data
       })
     }
   }
})
