import withLayout from "../components/layout/withLayout";
import styles from "./createInvoice.module.css";
import Button from "../components/util/button/button";
import CreateInvoiceForm from "./createInvoiceForm";
import Card from "../components/util/card/card";
import {useEffect, useState} from "react";
import {getCustomers} from "../api/customersApi";
import {getCategoriesWithSubcategories} from "../api/categoriesApi";
import {getCategoryProducts} from "../api/productsApi";
import {getCompanyData} from "../api/companyAPI";

const CreateInvoice = () => {

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [bankAccount, setBankAccount] = useState();

    useEffect(() => {

        async function fetchBankAccount() {
            const data = await getCompanyData();
            setBankAccount(data.data.bankAccountNumber);
        }

        async function fetchCustomers() {
            const data = await getCustomers();
            const transformedData = data.employees.map(customer => {
                return {
                    value: customer.id,
                    label: `${customer.name}, ${customer.Person.firstName} ${customer.Person.lastName}`
                };
            });
            setCustomers(transformedData);
        }

        async function fetchProducts() {
            const data = await getCategoriesWithSubcategories();
            const transformedData = [];

            for (const category of data.data) {
                const children = [];

                if (category.Subcategories) {
                    for (const subcategory of category.Subcategories) {
                        const products = await getCategoryProducts(subcategory.id);
                        children.push({
                            value: subcategory.id,
                            label: subcategory.name,
                            type: "subcategory",
                            children: products.map(product => ({
                                value: product.id,
                                type: "product",
                                label: `${product.name}, price: ${product.price}, description: ${product.description}`
                            })),
                        });
                    }
                } else {
                    const products = await getCategoryProducts(category.id);
                    children.push(...products.map(product => ({
                        value: product.id,
                        type: "product",
                        label: `${product.name}, price: ${product.price}, description: ${product.description}`
                    })));
                }

                transformedData.push({
                    value: category.id,
                    label: category.name,
                    type: "category",
                    children: children,
                });
            }
            setProducts(transformedData);
        }

        fetchBankAccount();
        fetchCustomers();
        fetchProducts();
    }, [])


    const handlePreviewInvoice = () => {
        console.log("Preview");
    }

    return (
        <Card>
            <div>
                <div className={styles.headers}>
                    <h1>Create Invoice</h1>
                    <div className={styles.actions}>
                        <Button label={"Preview"} onClick={handlePreviewInvoice}/>
                    </div>
                </div>
                <hr/>
            </div>
            <CreateInvoiceForm bankAccount={bankAccount} customers={customers} products={products}/>
        </Card>
    );
}

export default withLayout(CreateInvoice);