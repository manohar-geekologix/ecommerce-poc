import NavMenu from "@/components/NavMenu";

export default function Layout({ children }) {

    return (
        <>
            <NavMenu />
            {children}
        </>
    )
}