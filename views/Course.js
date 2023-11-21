import { Box, Flex, StatusBar, Text } from "native-base";
import ArticleRows from "../components/ArticleRows";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { get } from "../database/storage";
import priceFormater from "../utils/priceFormater";
import { calcCourseFromList, calcListCourseTotal } from "../utils/calc";

export default function () {

    const listeRef = useRef([])
    const budgetMoisRef = useRef(0)
    const budgetCourseRef = useRef(0)

    const [course, setCourse] = useState([])

    const [totalCourse, setTotalCourse] = useState(0)

    useFocusEffect(useCallback(() => {
        (async () => {
            try {

                listeRef.current = await get('list') ?? []
                budgetMoisRef.current = await get('budgetMois') ?? 0
                const course = await get('course') ?? []
                setCourse(course)
                budgetCourseRef.current = calcCourseFromList(listeRef.current, budgetMoisRef.current)
                
                updateCourse(course)
            } catch (e) {
                console.error(e.message);
            }
        })()
    }, []))

    const updateCourse = (data) => {
        setTotalCourse(calcListCourseTotal(data, budgetCourseRef.current))
    }

    return (
        <Flex paddingTop={6} justifyContent={'end'} w={"full"}  h={'full'} bg='black' alignItems={'center'}>
            <Box w={'full'} paddingX={5} paddingTop={2} paddingBottom={20} >
                <Text textAlign={'center'} fontSize={20} color={'white'} marginBottom={5}>Course</Text>
                <Flex direction="row" justifyContent={'space-between'} paddingRight={2}>
                    <Text color={'white'}>Total : <Text color={'cyan.500'} fontSize={20}>{priceFormater(budgetCourseRef.current)}</Text> </Text>
                    <Text marginBottom={5} color={'white'}>Disponible : <Text color={totalCourse < 0 ? 'red.500' : 'green.500'} fontSize={20}>{priceFormater(totalCourse)}</Text></Text>
                </Flex>
                <ArticleRows data={course} afterChange={updateCourse} dbKey={'course'} />
            </Box>
            <StatusBar barStyle={'light-content'} backgroundColor={'black'}/>
    </Flex>
    )
}