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
            <Box w={'full'} paddingX={5} paddingTop={10} paddingBottom={10} >
                <Text color={'white'}>Argent course total : {priceFormater(budgetCourseRef.current)} </Text>
                <Text marginBottom={5} color={'white'}>Argent course disponible : {priceFormater(totalCourse)}</Text>
                <ArticleRows data={course} afterChange={updateCourse} dbKey={'course'} />
            </Box>
            <StatusBar barStyle={'light-content'} />
    </Flex>
    )
}