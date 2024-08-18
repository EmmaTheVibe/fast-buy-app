import Card from "@/components/Card";
import { createClient } from "@/supabase/client";
import { notFound } from "next/navigation";

export const revalidate = 3601;

export default async function Home() {
  const supabase = createClient();
  const { data: topProducts, error: topProductsError } = await supabase
    .from("fastbuy-products")
    .select()
    .eq("boost", true);
  const { data: products, error } = await supabase
    .from("fastbuy-products")
    .select();

  if (!products) {
    return notFound();
  }

  return (
    <>
      <main className="min-h-screen max-w-[100rem] mx-auto">
        <div className="px-12 pt-12 pb-20">
          <div className="flex flex-col xl:flex-row gap-2 xl:gap-[8rem]">
            <div className="pt-12">
              <h2 className="text-5xl mb-16 text-gray-952">OUR TOP PRODUCTS</h2>
              <p className="text-xl text-gray-952">
                You can pay to boost your products here.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
              {topProducts ? (
                topProducts.map((product) => (
                  <Card
                    id={product.id}
                    key={`${product.name}-${product.id}`}
                    {...product}
                    imageUrl={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
                  />
                ))
              ) : (
                <p className="text-xl pt-12 text-gray-952">
                  All our products are gone
                </p>
              )}
            </div>
          </div>

          <h2 className="text-4xl mt-20 mb-16 text-gray-952">ALL PRODUCTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <Card
                id={product.id}
                key={`${product.name}-${idx}`}
                {...product}
                imageUrl={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
