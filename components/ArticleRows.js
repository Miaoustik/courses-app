import { Box, Icon, IconButton, ScrollView } from "native-base"
import { Entypo } from '@expo/vector-icons';
import useArticleRows from "../hooks/useArticleRows"


export default function ({ dbKey, data, afterChange }) {
    
    const {rows, adding, handlePress} = useArticleRows(dbKey, data, afterChange)

    return (
        <>
            <ScrollView marginBottom={5} w={'full'} h={'81%'}>
                {rows}
            </ScrollView>

            {!adding && <Box w={'full'}>
                <IconButton onPress={handlePress} variant={'outline'} borderColor={'white'} icon={<Icon as={Entypo} name="plus" color={"white"} />} ></IconButton>
            </Box>}
        </>
    )

}