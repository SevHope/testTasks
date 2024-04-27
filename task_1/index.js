import {encoded, translations} from './data.js'

const decodeFile = (encoded, translations) => {
    const decodedData = [];
    const exceptions = ['groupId', 'service', 'formatSize', 'ca'];
    for (const item of encoded) {
        const entries = Object.entries(item);
        for (let [key, value] of entries) {
            if (key.endsWith('Id') && !exceptions.includes(key)) {
                let newValue = translations[value];
                item[key] = newValue ? newValue : value;
            }
        }
            decodedData.push(item);
        }
        return decodedData;
};

const getUniqueId = (encoded) => {
    const allIds = [];
    const exceptions = ['groupId', 'service', 'formatSize', 'ca'];
    for (const item of encoded) {
        const entries = Object.entries(item);
        for (let [key, value] of entries) {
            if (key.endsWith('Id') && value !== null && !exceptions.includes(key) ) {
                allIds.push(value);
            }
        }
    }
    const uniqueIds = new Set(allIds);
    const result = (Array.from(uniqueIds)).sort((a, b) => a - b);
    return result;
}

getUniqueId(encoded);
decodeFile(encoded, translations);
