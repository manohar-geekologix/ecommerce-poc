import ProductDetails from "@/components/ProductDetails"

export default function Page({ params }) {
    const id = params.id
    return <ProductDetails id={id} />
}