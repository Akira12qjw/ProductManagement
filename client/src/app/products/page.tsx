import productApiRequest from "@/apiRequests/product";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import Link from "next/link";
import DeleteProduct from "./_components/delete-product";
import { cookies } from "next/headers";
import { Metadata } from "next";
import ProductAddButton from "./_components/product-add-button";
import ProductEditButton, {
  ProductEditCell,
} from "./_components/product-edit-button";

export const metadata: Metadata = {
  title: "Danh sách món ăn",
};

export default async function ProductListPage() {
  const { payload } = await productApiRequest.getList();

  const productList = payload.data;
  return (
    <div>
      <h1 className="text-center font-bold">Danh sách món ăn</h1>
      <ProductAddButton />

      <div className="space-y-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hình ảnh</TableHead>
              <TableHead>Tên món ăn</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Giá tiền</TableHead>
              <ProductEditCell />
            </TableRow>
          </TableHeader>
          {productList.map((product) => (
            <TableBody key={product.id}>
              <TableRow>
                <TableCell className="font-medium ">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="w-34 h-34 object-cover"
                    />
                  </Link>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price} VNĐ</TableCell>
                <ProductEditButton product={product} />
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </div>
  );
}
