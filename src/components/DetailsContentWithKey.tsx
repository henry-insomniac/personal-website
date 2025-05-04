"use client";
import DetailsContent from "./DetailsContent";
import { useSearchParams } from "next/navigation";

export default function DetailsContentWithKey() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return <DetailsContent key={id} />;
}
