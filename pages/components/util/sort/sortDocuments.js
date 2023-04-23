
const sortDocuments = (documents, sortOption) => {
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

export default sortDocuments;