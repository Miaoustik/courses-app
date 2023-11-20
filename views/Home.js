import { useCallback, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, save } from "../database/storage";
import { useFocusEffect } from "@react-navigation/native";
import { Box, Checkbox, Flex, Input, StatusBar, Text } from "native-base";
import priceFormater from "../utils/priceFormater";
import { calcCourseFromList, calcListCourseTotal, calcListTotal, calcRsaCompte } from "../utils/calc";

export default function Home () {

  const [budgetMois, setBudgetMois] = useState(0)
  const [total, setTotal] = useState(0)
  const [checked, setChecked] = useState(null)
  const [courseBudget, setCourseBudget] = useState(0)
  const [availableCourse, setAvailableCourse] = useState(0)

  //Add storage budgetmois checked if not checked calc rsacompte else get budgetMois in focuseffect

  const listRef = useRef([])
  const compteRef = useRef([])
  const rsaRef = useRef(0)
  const courseRef = useRef([])

  useFocusEffect(useCallback(() => {

    (async () => {
      try {
        
        compteRef.current = await get('compte') ?? []
        rsaRef.current = await get('rsa') ?? 0
        listRef.current = await get('list') ?? []
        courseRef.current = await get('course') ?? []

        
        const checked = await get('checked') ?? false

        let budget
        
        budget = await get('budgetMois')

        if (!budget || (checked === false)) {
          budget = await calcTotal()
        } else {
          
          setBudgetMois(budget)
        }
        updateTotal(budget)  
        
        
        const courseBudget = calcCourseFromList(listRef.current, budget)
        setCourseBudget(courseBudget)

        const availableCourse = calcListCourseTotal(courseRef.current, courseBudget)
        setAvailableCourse(availableCourse)

      } catch (e) {
        console.error(e.message);
      }
    })()
  }, []))

  const handleChange = (e) => {
    updateTotal(e)
    setBudgetMois(e)
  }

  const updateTotal = async (budget) => {
    setTotal(calcListTotal(listRef.current, budget))
  }

  const calcTotal = async () => {
    const budget = calcRsaCompte(rsaRef.current, compteRef.current)

    setBudgetMois(budget)
    save('budgetMois', budget)
    return budget
  }

  

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('budgetMois', budgetMois)
    } catch (e) {
      console.error(e.message);
    }
  }

  const handleCheck = (e) => {
    setChecked(e)
    save('checked', e)

    if (e === false) {
      const budget = calcTotal()
      updateTotal(budget)
    }
  }

  return (
    <Flex paddingTop={6} justifyContent={'center'} w={"full"}  h={'full'} bg='black' alignItems={'center'}>
      <Box w={'full'} paddingX={5} paddingTop={10} paddingBottom={10} >
        <Box borderWidth={1} borderColor={'white'} padding={3} borderRadius={20}>
          <Text fontSize={'20'} color={'white'}>Budget du mois</Text>
          <Text fontSize={'40'} color={'white'}>{priceFormater(budgetMois)}</Text>

          <Checkbox marginTop={5} onChange={handleCheck} isChecked={checked}><Text color={'white'}>Manuel</Text></Checkbox>
          {checked && <Input color={'white'} value={budgetMois.toString()} onSubmitEditing={handleSubmit} onChangeText={handleChange} keyboardType='numeric' />}

          <Text marginTop={30} fontSize={'20'} color={'white'}>En comptant la liste, il reste </Text>
          <Text fontSize={'50'} color={budgetMois < 0 ? 'red.500' : 'green.500'}>{priceFormater(total)}</Text>
        </Box>

        <Box borderWidth={1} borderColor={'white'} padding={3} borderRadius={20} marginTop={3}>
          <Text fontSize={'20'} color={'white'}>Budget course du mois</Text>
          <Text fontSize={'40'} color={'white'}>{priceFormater(courseBudget)}</Text>

          <Text marginTop={30} fontSize={'20'} color={'white'}>En comptant la liste, il reste </Text>
          <Text fontSize={'50'} color={budgetMois < 0 ? 'red.500' : 'green.500'}>{priceFormater(availableCourse)}</Text>
        </Box>

      </Box>
      <StatusBar barStyle={'light-content'} />
    </Flex>
  );
}
