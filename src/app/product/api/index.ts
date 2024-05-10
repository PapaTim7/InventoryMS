import { productList } from "@/mock/data";
import { ProductFullT, ProductT } from "../routes/Product.types";

const allProductData = productList;

export const getAllProducts: (searchName?: string) => Promise<ProductT[]> = (searchName?: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchNameLower = searchName?.toLowerCase() || '';
      const filteredData = searchName ? allProductData.filter((item: ProductT) => item.name.toLowerCase().includes(searchNameLower)) : allProductData;
      resolve(filteredData.map((item: ProductT) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        condition: item.condition,
        descriptionShort: item.descriptionShort,
        price: item.price,
        imagePreview: item.imagePreview
      })));
    }, 100);
  });
}

export const getProductById: (productId: string) => Promise<ProductFullT | undefined> = (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        allProductData.find((item: ProductFullT) => item.id === productId)
      );
    }, 1000);
  });
}

export const deleteProduct: (productId: string) => Promise<number> = (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = allProductData.findIndex((item: ProductFullT) => item.id === productId);
      allProductData.splice(index, 1);
      resolve(
        200
      );
    }, 1000);
  });
}