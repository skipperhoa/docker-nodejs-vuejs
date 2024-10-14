import { defineStore } from 'pinia'
import axios from 'axios'
export const useProductStore = defineStore('product', {
   state:()=>{
     return {
       products: [],
       totalProducts: 0,
       perPage: 5,
       currentPage: 1,
       totalPages: 0,
       onEachPage: 2,
       paginationOnEachPage: [] as any[]
     }
   },
   getters: {
     all(state){
       return state.products
     },
     total(state){
       return state.totalPages
     },
    
   },
   actions:{
     async getProducts(){
        await axios.get('https://dummyjson.com/products').then((response) => {
          //console.log("products",response.data.products)
          this.totalProducts = response.data.products.length
          this.totalPages = response.data.products.length / this.perPage
          this.pagination(1)
          this.paginate(this.totalPages, 1, this.onEachPage)
        })
      },
      pagination(page : number){
       axios.get('https://dummyjson.com/products/?limit='+this.perPage+'&skip='+((page-1)*this.perPage)+
      '&select=id,title,thumbnail,price,rating,category,description,meta,reviews,id,sku,brand').then((response) => {
        // console.log("pagination",response.data.products)
         let data = response.data.products;
         this.products = data
         this.paginate(this.totalPages, this.currentPage, this.onEachPage)
       })
     },
     paginate(totalPages :number, currentPage:number, onEachPage:number){
      //console.log("totalPages",totalPages,currentPage,onEachPage)
      const _currentPage  = Math.max(1, Math.min(totalPages, currentPage))
      const startPage = Math.max(1, _currentPage - onEachPage)
      const endPage = Math.min(totalPages, _currentPage + onEachPage)
      let pagination:any[] = []
       // Thêm trang đầu tiên và dấu chấm nếu cần
      if (startPage > 1) {
          pagination.push(1);
          if (startPage > 2) {
            pagination.push("...");  
          }
      }
       // Thêm các trang từ $startPage đến $endPage
        for (let i = startPage; i <= endPage; i++) {
            pagination.push(i);
        }
         // Thêm trang cuối cùng và dấu chấm nếu cần
      if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
              pagination.push("...");
          }
          pagination.push(totalPages);
      } 
      this.paginationOnEachPage = pagination
    }
   }
})
