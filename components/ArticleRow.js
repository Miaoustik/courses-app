import { Checkbox, Text, HStack, IconButton, Icon, VStack, Flex } from "native-base";
import priceFormater from "../utils/priceFormater";
import priceToFloat from "../utils/priceToFloat";
import { AntDesign } from '@expo/vector-icons';

export default function ArticleRow ({ name, price, checked, onDelete, onUpdate, onCheck, course = false, quantity = null }) {

    const totalPrice = priceToFloat(price) * parseInt(quantity)
    

    return (
        <HStack w={'full'} paddingTop={6} paddingBottom={6} borderTopWidth={1} borderTopColor={'white'} space={3} alignItems={'center'}>

            <Checkbox defaultIsChecked={checked} w={'20%'} size={'lg'} bgColor={'black'} aria-label="acheté" onChange={onCheck} />

            <Text onLongPress={onUpdate} w={course === true ? '40%' : '50%'}  wordWrap={'break-word'} color={'white'} >{name}</Text>

            {course === true ? (
                <>
                    <Text marginRight={2} w={'5%'} onLongPress={onUpdate} wordWrap={'break-word'} color={'white'} >{quantity ?? 0}</Text>
                    <VStack w={'17%'} space={2}>
                        <Text onLongPress={onUpdate} wordWrap={'break-word'} color={'white'} >{price}</Text>
                        <Text onLongPress={onUpdate} wordWrap={'break-word'} color={'white'} >{priceFormater(totalPrice)}</Text>
                    </VStack>
                </>
                
            ) : (
                <Text onLongPress={onUpdate} w={'17%'} wordWrap={'break-word'} color={'white'} >{price}</Text>
            )}

            

            <IconButton onPress={onDelete} w={'15%'} size="sm" icon={<AntDesign name="delete" size={24} color="#d17d2a" />} />
            
        </HStack>
    )
}
