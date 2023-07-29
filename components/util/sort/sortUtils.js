export const sortDocuments = (documents, sortOption) => {
    switch (sortOption) {
        case "oldest":
            return documents.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
        case "newest":
            return documents.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
        case "lowprice":
            return documents.sort((a, b) => parseFloat(a.totalAmount) - parseFloat(b.totalAmount));
        case "highprice":
            return documents.sort((a, b) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount));
        case "az":
            return documents.sort((a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber));
        case "za":
            return documents.sort((a, b) => b.invoiceNumber.localeCompare(a.invoiceNumber));
        default:
            return documents;
    }
}

export const sortCustomers = (customers, option) => {
    switch(option){
        case 'oldest':
            return [...customers].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        case 'newest':
            return [...customers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'az':
            return [...customers].sort((a, b) => a.name.localeCompare(b.name));
        case 'za':
            return [...customers].sort((a, b) => b.name.localeCompare(a.name));
        default:
            return customers;
    }
}