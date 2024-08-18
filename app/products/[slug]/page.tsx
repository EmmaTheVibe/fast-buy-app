import { createClient } from "@/supabase/client";
import { getCanonicalUrl, getImageUrl } from "@/utils";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const supabase = createClient();
  const { data: post } = await supabase
    .from("easysell-products")
    .select()
    .match({ id: slug })
    .single();

  if (!post) {
    return { title: "", description: "" };
  }

  return {
    title: post.name || "",
    description: post.description || "",
    openGraph: {
      images: [getImageUrl(post.imageUrl)],
    },
    alternates: {
      canonical: `${getCanonicalUrl()}/products/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: products } = await supabase.from("fastbuy-products").select();

  if (!products) {
    return [];
  }

  return products.map((product) => ({
    slug: product.id,
  }));
}

export default async function Page({ params }: Props) {
  const supabase = createClient();
  const { data } = await supabase
    .from("fastbuy-products")
    .select()
    .match({ id: params.slug })
    .single();

  return (
    <>
      <div className="px-12 py-12 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-between mb-6 lg:mb-12">
          <h2 className="text-3xl text-gray-952 lg:text-4xl items-start uppercase">
            {data.name}
          </h2>
          <a
            href={`mailto:${data.contactEmail}?subject=Interested in purchasing ${data.name}`}
            className="bg-gray-952 text-gray-951 hover:bg-orange-954 px-4 py-2 rounded-md hidden lg:flex"
          >
            Contact the Seller!
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4">
          <div className="flex items-center justify-center">
            <Image
              className="rounded-lg shadow-xl border-4 border-gray-200 p-2 lg:min-w-[40rem] lg:min-h-[30rem]"
              width={600}
              height={600}
              alt={data.name}
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/storage/${data.imageUrl}`}
            />
          </div>
          <div className="bg-gray-952 p-6 w-full">
            <label className="font-bold text-gray-951">💰 PRICE:</label>
            <p className="text-gray-951 text-2xl lg:text-3xl pt-4 py-6 text-center border-b-2 decoration-dotted border-dashed border-gray-951 border-opacity-15">
              ${data.price}
            </p>

            {data.boost && (
              <div className="pt-4">
                <label className="font-bold text-gray-951">
                  ⭐️ PREMIUM PRODUCT
                </label>
              </div>
            )}

            <a
              href={`mailto:${data.contactEmail}`}
              className="bg-gray-951 text-gray-952 px-4 py-2 rounded-md flex lg:hidden w-full items-center justify-center my-12"
            >
              Contact the Seller!
            </a>
          </div>
        </div>
        <div className="pt-6">
          <label className="font-bold pb-2 border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
            📝 DESCRIPTION:
          </label>
          <p className="text-gray-600 text-lg my-4 pt-4 pb-6 ">
            {data.description}
          </p>
        </div>
      </div>
    </>
  );
}
