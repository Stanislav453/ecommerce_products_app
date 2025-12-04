import { Category } from "../type";
import { API_URL } from "./apiUrl";

export const repository = {
  products: {
    getAll: ({ extent }: { extent?: string } = {}) => 
      `${API_URL}/products${extent ? `/?select=${extent}` : ""}`,
    // getById: ( {id, extent}: {id: string; extent?: string }) => 
    //   `${API_URL}/products/${id}${extent ? `?select=${extent}` : ""}`,
    // getByCategory: ( { category: Category; extent?: string }) => 
    //   `${API_URL}/products/category/${category}${extent ? `?select=${extent}` : ""}`,
    // search: ( { term: string; extent?: string }) => {
    //   const searchParam = `q=${encodeURIComponent(term)}`;
    //   if (extent) {
    //     return `${API_URL}/products/?select=${extent}&${searchParam}`;
    //   }
    //   return `${API_URL}/products/?${searchParam}`;
    // }
  },
  product: {
    getById: ( { id, extent }: { id: string; extent?: string }) => 
      `${API_URL}/products/${id}${extent ? `?select=${extent}` : ""}`
  },
  // categories: {
  //   getAll: ( { extent?: string } = {}) => 
  //     `${API_URL}/categories${extent ? `?select=${extent}` : ""}`
  // },
  // category: {
  //   getByName: ( { name: Category; extent?: string }) => 
  //     `${API_URL}/categories/${name}${extent ? `?select=${extent}` : ""}`
  // }
};

// Helper function to build full API URLs
export const buildUrl = (basePath: string, query: string) => `${basePath}${query}`;

// Example usage:
// const productUrl = repository.products.getByCategory({category: Category.Beauty, extent: extentPatterns.summary});
// Result: 'http://localhost:3000/products/category/beauty?select=id,title,thumbnail,price,rating,description'
