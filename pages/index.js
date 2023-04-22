import InvoicesPage from "./invoiceList/invoicesPage";
import Layout from "./components/layout/layout";
import Link from "next/link";

const CATEGORIES_OPTIONS = [
    {id: 1, name: "Spodnie"},
    {id: 2, name: "Bluzy"},
    {id: 3, name: "Koszule" }
]

function HomePage() {

    return (
        <Layout>
            <Link href="/invoiceList/invoicesPage"/>
        </Layout>
    )
}

export default HomePage;