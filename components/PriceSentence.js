import { Text } from "native-base"
import priceFormater from "../utils/priceFormater"

export default function ({ available}) {

    if (available < 0) {
        return <>
        <Text marginTop={30} fontSize={'20'} color={'white'}>Oups !! En comptant tes courses, j'ai vu que t'es allé trop loin :</Text>
        <Text fontSize={'50'} color={'red.500'}>{priceFormater(available)}</Text>
      </>
    }


    if (available < 50 && available > 0) {
        return <>
        <Text marginTop={30} fontSize={'20'} color={'white'}>Fais attention ! En comptant tes courses, il reste :</Text>
        <Text fontSize={'50'} color={'orange.500'}>{priceFormater(available)}</Text>
      </>
    }

    return <>
    <Text marginTop={30} fontSize={'20'} color={'white'}>En comptant tes courses, il reste :</Text>
    <Text fontSize={'50'} color={'green.500'}>{priceFormater(available)}</Text>
  </>

}