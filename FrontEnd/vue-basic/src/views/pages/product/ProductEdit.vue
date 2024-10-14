<template>
    <div class="container mx-auto px-4 sm:px-8">
        <div class="flex flex-row justify-between items-center">
            <h1 class="font-bold text-xl text-white py-5">Edit Product</h1>
            <div>
                <button @click="submitFormEdit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Save</button>
            </div>
        </div>

        <form class="w-full py-2 px-4 bg-white rounded-md">
            <div class="w-full py-2">
                <label for="title" class="block mb-2 text-sm font-bold text-gray-700">Title</label>
                <input type="text" id="title" name="title" class="w-full p-2 bg-gray-200 rounded-md" v-model="product.title">
            </div>
            <div class="w-full py-2">
                <label for="price" class="block mb-2 text-sm font-bold text-gray-700">Price</label>
                <input type="text" id="price" name="title" class="w-full p-2 bg-gray-200 rounded-md" v-model="product.price">
            </div>
            <div class="w-full py-2">
                <label for="price" class="block mb-2 text-sm font-bold text-gray-700">Category</label>
                <div>
                    <VueMultiselect 
                    v-model="selectCategory" 
                    :options="categoryOption"
                    :multiple="true"
                    />
                </div>
            </div>
            <div class="w-full py-2">
                <label for="tags" class="block mb-2 text-sm font-bold text-gray-700">Tags</label>
                <div>
                    <VueMultiselect 
                    v-model="selectedOption" 
                    :options="options"
                    :multiple="true"
                    
                    :custom-label="customLabel" 
                    />
                </div>
            </div>
            <div class="w-full py-2">
                <label for="description" class="block mb-2 text-sm font-bold text-gray-700">Description</label>
                <!-- <textarea id="description" name="title" class="w-full h-40 p-2 bg-gray-200 rounded-md"  v-model="product.description"></textarea> -->
                <md-editor 
                v-model="product.description"
                language="en" :onUploadImg="handleImageUpload" 
                />
            </div>
        </form>
    </div>  
</template>


<script  lang="ts">
    import axios from "axios";
    import {ref,reactive,isProxy, toRaw } from "vue";
    import { useRoute,RouterLink } from 'vue-router'
    import Multiselect from 'vue-multiselect';
    import {MdEditor}  from 'md-editor-v3';
   // import sanitizeHtml   from 'sanitize-html';
   interface Product {
     title: string;
     price: number;
     // Add other properties as needed
   }
    export default {
        components: {
            VueMultiselect: Multiselect,
            MdEditor:MdEditor
        },
        setup() {
            const route = useRoute()
            const product = ref<any>({ title: '', price: 0 });
            const selectCategory = ref(null);
            const categoryOption = ref([``]);
            const bodyText = ref('# Hello Editor')
            
            /* select option */
            const selectedOption = ref(null);
            const options = ref([]);
           const  customLabel =(option : any)=>{
                //return `${option.library} - ${option.language}`
                return option;
            }
            /* end select option */
            const getProduct = ()=>{
                axios.get('https://dummyjson.com/products/'+route.params.id).then((response) => {
                    product.value = response.data
                    options.value = response.data.tags
                    selectedOption.value = response.data.tags,
                    selectCategory.value = response.data.category
                    bodyText.value = response.data.description
                })
            }
            const getProductCategory = ()=>{
                axios.get('https://dummyjson.com/products/category-list').then((response) => {
                    categoryOption.value = response.data
                    
                })
            }

            const getUsers = ()=>{
                axios.get('http://127.0.0.1:8081').then((response) => {
                   console.log(response.data)
                    
                })
            }
            getUsers()

            /* xử lý upload img */
            const markdownContent = ref('');

            // Hàm xử lý khi tải ảnh lên
           const handleImageUpload = (files: any[], callback: (urls: string[]) => void) => {
              // ...
              
                const uploadPromises = files.map((file) => {
                    // Giả sử bạn có một hàm `uploadFile` để tải lên file và trả về URL của ảnh.
                    return uploadFile(file);
                });

                // Khi tất cả ảnh đã được tải lên
                Promise.all(uploadPromises).then((urls) => {
                    // Gọi callback với danh sách URL của ảnh đã tải lên
                   // callback(urls.map((url) => ({ url, alt: 'image', title: 'image title' })));
                    //callback(urls.map((url) => ({ url: [url], alt: 'image'})));
                    callback(urls); // Return an array of strings
                });
            };

            // Giả sử có một API tải file
            const uploadFile = (file: any): Promise<string> => {
            return new Promise((resolve, reject) => {
                // Thay thế bằng logic tải file thực tế, ví dụ như sử dụng `fetch` hoặc `axios`
                const formData = new FormData();
                formData.append('files', file);
                // Duyệt qua FormData để hiển thị thông tin chi tiết của file
                formData.forEach((value, key) => {
                if (value instanceof File) {
                    // Nếu value là một file, hiển thị thông tin chi tiết của file
                    console.log(`${key}:`);
                    console.log(`  Name: ${value.name}`);    // Tên file
                    console.log(`  Size: ${value.size} bytes`); // Kích thước file (byte)
                    console.log(`  Type: ${value.type}`);    // Loại file (MIME type)
                } else {
                    // Nếu không phải file, hiển thị giá trị bình thường
                    console.log(`${key}: ${value}`);
                }
                });
                // Sử dụng fetch hoặc axios để gọi API tải file
               // Gửi request POST với FormData
                axios.post('http://127.0.0.1:8081/api/products/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Chỉ định type dữ liệu là form-data
                       //"Content-Type": "application/json" 
                    }
                })
                .then((response) => {
                    console.log('File uploaded successfully:', response);
                    resolve(response.data.url[0]); // Giả sử response.data.files chứa các URL
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                   reject(error);
                });
            });
            };

            /* end xử lý upload img */

            /* submit form edit */
            const submitFormEdit = ()=>{
                //console.log("local data products",product.value)
                const _product = product.value

                // Khai bằng Proxy(Object) 
                let rawData = _product;

                if (isProxy(_product)){
                    //get data in proxy object
                    rawData = toRaw(_product)
                }
                // trả về object{}
                console.log("local data products",rawData.title)

                 axios.put('https://dummyjson.com/products/'+route.params.id,
                {
                    title:rawData.title,
                    description:bodyText.value
                }
                 ,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log("response from server",response.data)
                    
                }) 
            }
            /* end submit form edit */



            getProductCategory()
            getProduct()
            return {
                product,
                selectedOption,
                options,
                selectCategory,
                categoryOption,
                customLabel,
                bodyText,
                markdownContent,
                handleImageUpload,
                submitFormEdit
            }
        }
    }
</script>

<style>
/* Thêm CSS của vue-multiselect */
@import "vue-multiselect/dist/vue-multiselect.min.css";
/* them md-editor-v3 */
@import 'md-editor-v3/lib/style.css';
</style>

<!-- them md-editor-v3 -->
