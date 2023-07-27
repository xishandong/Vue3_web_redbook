import {defineStore} from "pinia";
import {ref} from "vue";

export const useTableStore = defineStore('table', () => {
    const tableStoreData = ref([])
    const storeMessage = (type, page, data, total) => {
        tableStoreData.value = [...tableStoreData.value, {type: type, page: page, data: data, total: total}]
    }
    const retrieveData = (type, page) => {
        const cachedData = tableStoreData.value.find((item) => item.type === type && item.page === page);
        return cachedData ? cachedData : false;
    };
    return {
        tableStoreData,
        storeMessage,
        retrieveData
    }
})