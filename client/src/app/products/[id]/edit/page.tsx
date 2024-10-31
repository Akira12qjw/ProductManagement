import productApiRequest from "@/apiRequests/product";
import React, { cache } from "react";
import ProductAddForm from "../../_components/product-add-form";
import { Metadata, ResolvingMetadata } from "next";

const getDetail = cache(productApiRequest.getDetail);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;
  return {
    title: "Edit sản phẩm: " + product.name,
    description: product.description,
  };
}

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  let product = undefined;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}
  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      <ProductAddForm product={product} />
    </div>
  );
}
