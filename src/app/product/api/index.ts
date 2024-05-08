import { productList } from "@/mock/data";
import { ProductT } from "../routes/Product.types";

export const getAllProducts: () => Promise<ProductT[]> = () => {
  // TODO add filtering for blocked/liked accounts
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productList.map((item: ProductT) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        descriptionShort: item.descriptionShort,
        price: item.price,
        imagePreview: item.imagePreview
      })));
    }, 1000);
  });
}
