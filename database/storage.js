import AsyncStorage from "@react-native-async-storage/async-storage"

export async function get (dbKey) {
    const dataJson = await AsyncStorage.getItem(dbKey)
    return JSON.parse(dataJson)
}

export function save (dbKey, data) {
    return AsyncStorage.setItem(dbKey, JSON.stringify(data))
}