import { HStack, IconButton, Icon, Input, Button } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

export default function ArticleRowForm ({ handleOk, handleNo, defaultName = '', defaultPrice = '', defaultQuantity = '', course = false }) {

    const [name, setName] = useState(defaultName)
    const [price, setPrice] = useState(defaultPrice)
    const [quantity, setQuantity] = useState(defaultQuantity)
    

    const ok = () => {
        handleOk(name, price, quantity)
    }



    return (
        <HStack w={'full'} paddingTop={6} paddingBottom={6} borderTopWidth={1} borderTopColor={'white'} space={2} alignItems={'center'}>

            <Input defaultValue={defaultName} onChangeText={setName} w={course === true ? '35%' : '50%'} color={'white'} wordWrap={'break-word'}/>

            {course && (
                <Input defaultValue={defaultQuantity} onChangeText={setQuantity} w={'15%'} keyboardType="numeric"  color={'white'} />
            )}

            <Input defaultValue={defaultPrice} onChangeText={setPrice} w={'20%'} keyboardType="numeric"  color={'white'} />

            <Button.Group w={'20%'}>
                <IconButton onPress={ok}  size="sm" icon={<Icon as={AntDesign} name="check"  size="sm" color="white" />} />
                <IconButton onPress={handleNo} size="sm" icon={<Icon as={AntDesign} name="close"  size="sm" color="white" />} />
            </Button.Group>
            
        </HStack>
    )
}
