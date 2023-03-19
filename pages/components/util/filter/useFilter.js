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