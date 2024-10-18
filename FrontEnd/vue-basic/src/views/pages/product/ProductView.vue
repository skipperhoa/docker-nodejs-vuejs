<template>
  <div class="container mx-auto px-4 sm:px-8">
  <div class="py-8">
    <div class="flex flex-row justify-between items-center">
      <h2 class="text-2xl font-semibold leading-tight text-white">Products</h2>
      <div class="flex flex-row gap-2">
          <div class="flex flex-row items-center gap-2">
             <label for="" class="text-sm font-bold text-white">Search</label>
            <div class="relative">
              <input type="text" v-model="search" @change="submitSearch" class="w-full py-1 px-2 bg-gray-800 rounded-md text-sm text-white outline-none placeholder:text-white">
              <span v-if="search" v-on:click="removeSearch" class="absolute top-1/2 -translate-y-1/2 right-2 text-white cursor-pointer">X</span>
            </div>
            <div class="flex flex-row items-center gap-2">
               <label for="" class="text-sm font-bold text-white">Filter</label>
               <div>
                <VueMultiselect 
                    v-model="category" 
                    :options="productCategory"
                    placeholder = "All"
                    :multiple="false"
                    :show-labels="false" 
                     :clear-on-select="true"
                    @select="selectFilterProductCategory"
                    >
                    <template slot="beforeList">
    <div>
      <button>none</button>
      <button>all</button>
    </div>
  </template>
                  </VueMultiselect>
               </div>
            </div>
          </div>
         
      </div>
    </div>

    <!-- hiện thị dữ liệu -->
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div
        class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
      >
        <table class="min-w-full leading-normal bg-gray-700 text-gray-400">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
              >
              rating
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
              >
               Brand
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
              >
                Create at
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-500 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
              >
                Modify
              </th>
            </tr>
          </thead>
          <tbody v-if="products.length>0">
            <tr v-for="product in products" key="product.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-500 text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-16 h-16">
                    <img
                      class="w-full h-full "
                      v-bind:src="product.thumbnail"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-white whitespace-no-wrap">
                      {{ product.title }}
                    </p>
                    <p class="text-white whitespace-no-wrap">SKU : {{ product.sku }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-500 text-sm">
                <p class="text-white whitespace-no-wrap">${{ product.price }}</p>
                <p class="text-white whitespace-no-wrap">USD</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-500 text-sm">
                <p class="text-white whitespace-no-wrap">{{ product.rating }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-500 text-sm">
               
                  <span class="relative text-red-200">{{ product.category }}</span>
               
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-500 text-sm">
               
               <span class="relative text-white">{{ product.brand }}</span>
            
           </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-500 text-sm">
               
                  <span class="relative text-white">{{ formattedDate(product.meta.createdAt) }}</span>
             
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-500 text-sm text-center">
                <RouterLink :to="{ name: 'ProductDetail', params: { id: product.id } }" class="bg-green-500 text-white p-2 rounded-md">Xem</RouterLink>
              </td>
            </tr>  
          </tbody>
        </table>  
      </div>
    </div>

    <!-- hiện thị phân trang -->
     <div class="flex flex-row items-center justify-between">

       <nav v-if="paginations.length>0 && products.length>0">
         <ul class="pagination flex flex-wrap gap-2">
           <li
             v-for="page in paginations"
             :key="page"
             class="page-item bg-gray-500 text-white w-8 h-8 flex items-center justify-center rounded-md"
             :class="{ 'bg-green-700 text-white': currentPage === page }"
           >
             <button
               class="page-link"
               @click="changePage(page)"
             >
               {{ page }}
             </button>
           </li>
         </ul>
       </nav>
       <span class="text-white bg-green-700 p-1 rounded">Total :  {{ totalProducts }}</span>
     </div>
  </div>
 </div>
</template>
<script>
import { RouterLink } from 'vue-router'
import { computed,ref } from 'vue'
import { format } from 'date-fns';
import { useProductStore } from '../../../stores/product'
import axios from 'axios';
import Multiselect from 'vue-multiselect';
export default {
  //name: 'ProductView',
  components: {
            VueMultiselect: Multiselect,
           
  },
  setup() {
    const search = ref('')
    const category = ref("")
    const productCategory = ref(["beauty","fragrances"])
    const productStore = useProductStore()
    // Dispatch fetch products
    productStore.getProducts()
    // Reactive computed properties
    const totalProducts = computed(() => productStore.totalProducts)
    const products = computed(() => productStore.all) 
    const totalPages = computed(() => productStore.total)
    const currentPage = computed(() => productStore.currentPage)
    const paginations = computed(() => productStore.paginationOnEachPage)
    
    const formattedDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
    };
    // Hàm thay đổi trang
    const changePage = (page) => {
      productStore.currentPage = page
      if(search.value != ''){
        productStore.searchPagination(search.value)
      }else{
        productStore.pagination(page)
      }
      
    }
    //search
    const submitSearch = () => {
      if(search.value != ''){
        productStore.currentPage = 1
        productStore.searchPagination(search.value)
      
      }
      
    }
    //remove search pagination
    const removeSearch = () => {
      productStore.currentPage = 1
      search.value = ''
      productStore.getProducts()
    }

    // get product category
    const getProductCategory = ()=>{
      axios.get('https://dummyjson.com/products/category-list').then((response) => {
        productCategory.value = response.data
      })
    }
    const selectFilterProductCategory=(option, id)=>{
      let _value = option
      productStore.currentPage = 1
      let url ='https://dummyjson.com/products/category/'+_value+
      '?limit='+productStore.perPage+'&skip='+((productStore.currentPage-1)*productStore.perPage)
      axios.get(url).then((response) => {
        console.log("Filter product category",response.data)
        productStore.products = response.data.products
        productStore.totalPages = Math.ceil(response.data.total / productStore.perPage)
        productStore.paginate(productStore.totalPages, 1, productStore.onEachPage)
      })
      
    }
   getProductCategory();
    return {
      products,
      totalPages,
      currentPage,
      changePage,
      formattedDate,
      paginations,
      totalProducts,
      search,
      submitSearch,
      removeSearch,
      category,
      productCategory,
      selectFilterProductCategory
    }
  }
}
</script>
<style>
/* Thêm CSS của vue-multiselect */
@import "vue-multiselect/dist/vue-multiselect.min.css";
/* custom select filter */
.multiselect{
  width: 150px !important;
  height: 30px !important;
  min-height: 30px !important;
}
.multiselect__tags{
  height: 30px !important;
  min-height: 30px !important;
  padding:2px 40px 0 4px;
}
.multiselect__select{
  height: 30px !important;
  min-height: 30px !important;
}
.multiselect__option{
  font-size: 12px !important;
}
.multiselect__single{
  font-size: 14px;
}
</style>



