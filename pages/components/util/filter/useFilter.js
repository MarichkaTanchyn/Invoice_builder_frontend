import {useCallback, useState} from "react";

const useFilter = () => {
    const [filterSettings, setFilterSettings] = useState({});

    const applyFilter = useCallback(
        (documents) => {
            let filteredDocuments = documents;

            // Check if useDate is true and a date value is provided
            if (filterSettings.useDate && filterSettings.date) {
                const filterDate = new Date(filterSettings.date);
                filteredDocuments = filteredDocuments.filter((doc) => {
                    const docCreatedAt = new Date(doc.creationDate);
                    return (
                        docCreatedAt.getFullYear() === filterDate.getFullYear() &&
                        docCreatedAt.getMonth() === filterDate.getMonth() &&
                        docCreatedAt.getDate() === filterDate.getDate()
                    );
                });
            }
            if (
                filterSettings.useTotalAmountDue &&
                filterSettings.fromTotalAmountDue &&
                filterSettings.toTotalAmountDue
            ) {
                const fromTotalAmountDue = parseFloat(filterSettings.fromTotalAmountDue);
                const toTotalAmountDue = parseFloat(filterSettings.toTotalAmountDue);

                filteredDocuments = filteredDocuments.filter((doc) => {
                    return (
                        doc.totalAmount >= fromTotalAmountDue &&
                        doc.totalAmount <= toTotalAmountDue
                    );
                });
            }

            if (
                filterSettings.useDateRange &&
                filterSettings.fromDate &&
                filterSettings.toDate
            ) {
                const fromDate = new Date(filterSettings.fromDate);
                const toDate = new Date(filterSettings.toDate);
                toDate.setHours(23, 59, 59, 999);

                filteredDocuments = filteredDocuments.filter((doc) => {
                    const docDate = new Date(doc.date);
                    return docDate >= fromDate && docDate <= toDate;
                });
            }

            if (filterSettings.useSelectStatus && filterSettings.selectStatus) {
                const filterStatus = filterSettings.selectStatus.value.toLocaleString().toLowerCase();
                filteredDocuments = filteredDocuments.filter(
                    (doc) => doc.status.toLowerCase() === filterStatus
                );
            }
            if (filterSettings.useSelectUser && filterSettings.selectUser) {
                const filterUsers = filterSettings.selectUser.map(user => user.value);
                if (filterUsers.length > 0) {
                    filteredDocuments = filteredDocuments.filter(
                        (doc) => filterUsers.includes(doc.Employee.PersonId)
                    );
                }
            }



            return filteredDocuments;
        },
        [filterSettings]
    );

    const clearFilterSettings = () => {
        setFilterSettings({});
    };

    const updateFilterSettings = (settings) => {
        setFilterSettings(settings);
    };

    return { applyFilter, updateFilterSettings, clearFilterSettings};
};

export default useFilter;