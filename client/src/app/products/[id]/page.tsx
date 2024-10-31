import productApiRequest from "@/apiRequests/product";
import { baseOpenGraph } from "@/app/shared_metadata";
import envConfig from "@/config";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import React, { cache } from "react";

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
  const url = envConfig.NEXT_PUBLIC_URL + "/products/" + product.id;
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      ...baseOpenGraph,
      title: product.name,
      description: product.description,
      url,
      images: [
        {
          url: product.image,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  let product = null;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {}
  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
            className="w-34 h-34 object-cover"
          />
          <h3>Tên: {product.name}</h3>
          <div>Giá: {product.price}</div>
        </div>
      )}
    </div>
  );
}
