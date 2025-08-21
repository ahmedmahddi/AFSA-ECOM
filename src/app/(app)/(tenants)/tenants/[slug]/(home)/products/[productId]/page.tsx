
import { ProductView } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

interface Props {
    params: Promise<{ productId: string; slug: string }>;
}


const Page = async ({ params }: Props) => {
    const { productId, slug } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        slug,
    }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoaderIcon className="animate-spin" /></div>}>
                <ProductView productId={productId} tenantSlug={slug} />
            </Suspense>

        </HydrationBoundary>
    )
}

export default Page;