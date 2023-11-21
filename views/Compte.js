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
            <Box w={'full'} h={'full'} paddingX={5} paddingTop={2} paddingBottom={10} >
            <Text textAlign={'center'} fontSize={20} color={'white'} marginBottom={5}>Compte</Text>
                <HStack space={3} w={'full'} alignItems={'center'} justifyContent={'space-between'} marginBottom={5}>
                    <Text fontSize={'20'} color={'white'}>Salaire : </Text>
                    <Flex w={'40%'} direction="row" alignItems={'center'} paddingRight={5}>
                        <Input borderColor={'green.500'} fontSize={20} value={rsa.toString()} onSubmitEditing={handleSubmitRsa} onChangeText={setRsa}  textAlign={'center'} keyboardType="numeric" color={'white'}/>
                        <Text marginLeft={1} fontSize={20} color={'white'}>€</Text>
                    </Flex>
                </HStack>
                <ArticleRows data={compte} dbKey={'compte'} />
            </Box>
            <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
        </Flex>
    )
}