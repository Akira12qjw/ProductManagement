"use client";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import Link from "next/link";
import React from "react";
import DeleteProduct from "./delete-product";
import { ProductListResType } from "@/schemaValidations/product.schema";
import { isClient } from "@/lib/http";

export default function ProductEditButton({
  product,
}: {
  product: ProductListResType["data"][0];
}) {
  const isAuthenticated =
    isClient() && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) return null;
  return (
    <TableCell className="text-right">
      <Link href={`/products/${product.id}/edit`}>
        <Button variant={"outline"}>Chỉnh sửa món</Button>
      </Link>
      <DeleteProduct product={product} />
    </TableCell>
  );
}

export function ProductEditCell() {
  const isAuthenticated =
    isClient() && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) return null;
  return <TableHead className="text-right">Chỉnh sửa món ăn</TableHead>;
}
