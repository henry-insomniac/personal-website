import { Suspense } from "react";
import DetailsContentWithKey from "@/components/DetailsContentWithKey";

export default function DetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-gray-400 py-12">加载中...</div>
      }
    >
      <DetailsContentWithKey />
    </Suspense>
  );
}
