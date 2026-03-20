import { brands } from "@/lib/mock-data";
import BrandDetailClient from "./brand-detail";

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.id }));
}

export default function BrandDetailPage({ params }: { params: Promise<{ brand: string }> }) {
  return <BrandDetailClient params={params} />;
}
