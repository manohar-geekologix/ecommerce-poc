import ProductDetails from "@/components/product/ProductDetails"

export const metadata = {
    title: "Product Detail",
};

export default function Page({ params }) {
    const id = params.id
    return <ProductDetails id={id} />
}