import { Box, Flex, StatusBar, Text } from "native-base";
import { useCallback, useRef, useState } from "react";
import { get } from "../database/storage";
import ArticleRows from "../components/ArticleRows";
import priceFormater from "../utils/priceFormater";
import { useFocusEffect } from "@react-navigation/native";
import { calcListTotal } from "../utils/calc";

export default function List () {

    const [budgetMois, setBudgetMois] = useState(0)
    const [list, setList] = useState([])

    const [total, setTotal] = useState(0)

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const budget = await get('budgetMois') ?? 0
                setBudgetMois(budget)
                const list = await get('list') ?? []
                setList(list)
                updateTotal(list, budget)
            } catch (e) { console.error(e) }
        })()
    }, []))

    const updateTotal = async (data, budget) => {
        setTotal(calcListTotal(data, budget))
    }

    return (
        <Flex paddingTop={6} justifyContent={'end'} w={"full"}  h={'full'} bg='black' alignItems={'center'}>
            <Box w={'full'} h={'full'} paddingX={5} paddingTop={2} paddingBottom={10} >
                <Text textAlign={'center'} fontSize={20} color={'white'} marginBottom={5}>Budget</Text>
                <Flex direction="row" justifyContent={'space-between'} paddingRight={2}>
                    <Text color={'white'}>Total : <Text color={'cyan.500'} fontSize={20}>{priceFormater(budgetMois)}</Text> </Text>
                    <Text marginBottom={5} color={'white'}>Disponible : <Text color={total < 0 ? 'red.500' : 'green.500'} fontSize={20}>{priceFormater(total)}</Text></Text>
                </Flex>
                <ArticleRows data={list} afterChange={(data) => updateTotal(data, budgetMois)} dbKey={'list'} />
            </Box>
            <StatusBar barStyle={"light-content"} backgroundColor={'black'}/>
        </Flex>
    )
}
