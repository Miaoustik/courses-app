import { Box, Flex, StatusBar, Text } from "native-base";
import { useCallback, useRef, useState } from "react";
import { get } from "../database/storage";
import ArticleRows from "../components/ArticleRows";
import priceFormater from "../utils/priceFormater";
import { useFocusEffect } from "@react-navigation/native";
import { calcListTotal } from "../utils/calc";

export default function List () {

    const budgetMoisRef = useRef(0)
    const [list, setList] = useState([])

    const [total, setTotal] = useState(0)

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                budgetMoisRef.current = await get('budgetMois') ?? 0
                const list = await get('list') ?? []
                setList(list)
                updateTotal(list)
            } catch (e) { console.error(e) }
        })()
    }, []))

    const updateTotal = async (data) => {
        setTotal(calcListTotal(data, budgetMoisRef.current))
    }

    return (
        <Flex paddingTop={6} justifyContent={'end'} w={"full"}  h={'full'} bg='black' alignItems={'center'}>
            <Box w={'full'} paddingX={5} paddingTop={10} paddingBottom={4} >
                <Text color={'white'} mb={5} fontSize={"lg"} >Il reste {priceFormater(total)}</Text>
                <ArticleRows data={list} afterChange={updateTotal} dbKey={'list'} />
            </Box>
            <StatusBar barStyle={"light-content"} />
        </Flex>
    )
}
