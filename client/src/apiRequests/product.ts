import http from "@/lib/http";
import { UpdateMeBodyType } from "@/schemaValidations/account.schema";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
} from "@/schemaValidations/product.schema";

export const productApiRequest = {
  getList: () =>
    http.get<ProductListResType>("/products", {
      cache: "no-store",
    }),
  getDetail: (id: number) =>
    http.get<ProductResType>(`/products/${id}`, {
      cache: "no-store",
    }),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>("/products", body),

  update: (id: number, body: UpdateMeBodyType) =>
    http.put<ProductResType>(`/products/${id}`, body),

  uploadImage: (body: FormData) =>
    http.post<{ message: string; data: string }>("/media/upload", body),

  delete: (id: number) => http.delete<ProductResType>(`/products/${id}`),
};

export default productApiRequest;
