import { Box, Flex, HStack, Input, StatusBar, Text } from "native-base";
import ArticleRows from "../components/ArticleRows";
import { useCallback, useState } from "react";
import { get, save } from "../database/storage";
import { useFocusEffect } from "@react-navigation/native";

export default function () {

    const [rsa, setRsa] = useState(0)
    const [compte, setCompte] = useState([])

    const handleSubmitRsa = () => {
        save('rsa', rsa)
    }

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const rsa = parseFloat( await get('rsa') ?? 0)
                setRsa(rsa)
                const compte = await get('compte') ?? []
                setCompte(compte)
            } catch (e) {
                console.error(e.message);
            }
        })()
        
    }, []))

    return (
        <Flex paddingTop={6} justifyContent={'end'} w={"full"}  h={'full'} bg='black' alignItems={'center'}>
            <Box w={'full'} paddingX={5} paddingTop={10} paddingBottom={10} >
                <HStack space={3} w={'full'} alignItems={'center'} marginBottom={5}>
                    <Text color={'white'}>Salaire : </Text>
                    <Input value={rsa.toString()} onSubmitEditing={handleSubmitRsa} onChangeText={setRsa} w={'30%'} keyboardType="numeric" color={'white'}/>
                </HStack>
                <ArticleRows data={compte} dbKey={'compte'} />
            </Box>
            <StatusBar barStyle={'light-content'} />
        </Flex>
    )
}