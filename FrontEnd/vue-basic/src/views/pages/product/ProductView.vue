<template>
  <div class="container mx-auto px-4 sm:px-8">
  <div class="py-8">
    <div>
      <h2 class="text-2xl font-semibold leading-tight text-white">Products</h2>
    </div>

    <!-- hiện thị dữ liệu -->
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div
        class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
      >
        <table class="min-w-full leading-normal bg-gray-500">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
              rating
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Brand
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Create at
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Modify
              </th>
            </tr>
          </thead>
          <tbody v-if="products.length>0">
            <tr v-for="product in products" key="product.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-16 h-16">
                    <img
                      class="w-full h-full "
                      v-bind:src="product.thumbnail"
                      alt=""
                    />
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ product.title }}
                    </p>
                    <p class="text-gray-600 whitespace-no-wrap">SKU : {{ product.sku }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm">
                <p class="text-gray-900 whitespace-no-wrap">${{ product.price }}</p>
                <p class="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ product.rating }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm">
               
                  <span class="relative">{{ product.category }}</span>
               
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm">
               
               <span class="relative">{{ product.brand }}</span>
            
           </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm">
               
                  <span class="relative">{{ formattedDate(product.meta.createdAt) }}</span>
             
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-gray-200 text-sm text-center">
                <RouterLink :to="{ name: 'ProductDetail', params: { id: product.id } }" class="bg-green-500 text-white p-2 rounded-md">Xem</RouterLink>
              </td>
            </tr>  
          </tbody>
        </table>  
      </div>
    </div>

    <!-- hiện thị phân trang -->
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
  </div>
 </div>
</template>
<script>
import { RouterLink } from 'vue-router'
import { computed,ref } from 'vue'
import { format } from 'date-fns';
import { useProductStore } from '../../../stores/product'
export default {
  //name: 'ProductView',
  setup() {
    const productStore = useProductStore()
    // Dispatch fetch products
    productStore.getProducts()
    // Reactive computed properties
    const products = computed(() => productStore.all) 
    const totalPages = computed(() => productStore.total)
    const currentPage = computed(() => productStore.currentPage)
    const paginations = computed(() => productStore.paginationOnEachPage)
    
    const formattedDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
    };
    // Hàm thay đổi trang
    const changePage = (page) => {
      productStore.pagination(page)
      productStore.currentPage = page
      paginate(totalPages.value, currentPage.value, onEachPage.value)
    }
    return {
      products,
      totalPages,
      currentPage,
      changePage,
      formattedDate,
      paginations
    }
  }
}
</script>



