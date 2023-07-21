export const objectIncludes = (obj, searchTerm) => {
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (objectIncludes(obj[key], searchTerm)) return true;
        } else if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(searchTerm)) {
            return true;
        }
    }
    return false;
}