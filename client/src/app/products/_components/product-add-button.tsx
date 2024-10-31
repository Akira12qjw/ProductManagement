"use client";
import { Button } from "@/components/ui/button";
import { isClient } from "@/lib/http";
import Link from "next/link";
import React from "react";

export default function ProductAddButton() {
  const isAuthenticated =
    isClient() && Boolean(localStorage.getItem("sessionToken"));
  if (!isAuthenticated) return null;
  return (
    <Link href={"/products/add"}>
      <Button variant={"secondary"}> Thêm món ăn </Button>
    </Link>
  );
}
