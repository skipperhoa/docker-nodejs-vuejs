<template>
    <div class="w-full max-w-3xl m-auto">
       <div class="w-full bg-gray-500 p-5 mt-5 flex flex-col rounded-md">
          <div class="w-full">
             <img v-bind:src="product.thumbnail" alt="" class="m-auto block"/>
          </div>
          <div class="w-full">
              <h2 class="font-bold text-xl capitalize">{{product.title}}</h2>
              <p>Price : ${{ product.price }}</p>
              <p>Category : {{ product.category }}</p>
             
              <p>Rating : {{ product.rating }}</p>
              <div v-if="markdownContent!=null" class="content"> 
                <md-preview :modelValue="markdownContent" codeStyleReverse />
              </div>
             <!--  <p>Reviews:</p>
              <ul>
                  <li v-for="review of product.reviews" :key="view" class="w-full p-2 bg-orange-400 rounded-md">
                    <div>
                        <p>{{ review.reviewerName }} - {{ review.reviewerEmail }}</p>
                        <p>{{ review.comment }}</p>
                        <span>Rating: {{ review.rating }}</span>
                    </div>

                  </li>
              </ul> -->
              <div class="w-full mt-5 flex flex-row gap-2">
                  <RouterLink :to="{ name: 'ProductView' }" class="w-auto p-2 bg-blue-500 rounded-md text-white">Back</RouterLink>
                  <RouterLink :to="{ name: 'ProductEdit', params: { id: product.id } }" class="w-auto p-2 bg-orange-500 rounded-md text-white">Edit</RouterLink>
                  <RouterLink :to="{ name: 'ProductView' }" class="w-auto p-2 bg-red-500 rounded-md text-white">Remove</RouterLink>
              </div>
          </div>
       </div>
    </div>
</template>
<script lang="ts">
    import axios from "axios";
    import {ref} from "vue";
    import { useRoute,RouterLink } from 'vue-router'
    import {MdEditor,MdPreview} from 'md-editor-v3';
    interface Product{
        id:number,
        title:string,
        thumbnail:string,
        description:string,
        price:number,
        category:string,
        rating:number
    }
    export default {
        components: {
           
            MdEditor:MdEditor,
            MdPreview
        },
        setup() {
            const route = useRoute()
            const product = ref({} as Product);
            const  markdownContent = ref(null)
            const getProduct = ()=>{
                axios.get('https://dummyjson.com/products/'+route.params.id).then((response) => {
                    product.value = response.data
                    markdownContent.value = response.data.description 
                })
            }
            getProduct()
            return {
                product,
                markdownContent
            }
        }
    }
</script>

<style>

/* them md-editor-v3 */
/* @import 'md-editor-v3/lib/style.css'; */

/* style */
.content p{
    color:red
}
</style>
