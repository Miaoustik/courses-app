import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useEffect, useRef, useState } from "react"
import { get, save } from "../database/storage"
import priceFormater from "../utils/priceFormater"
import ArticleRow from "../components/ArticleRow"
import ArticleRowForm from "../components/ArticleRowForm"

export default function (dbKey, data = [], afterChange = null) {

    const buildArray = (data) => {
        const n = []
        data.forEach(el => {
            n.push(<ArticleRow course={dbKey === 'course'} onUpdate={() => handlePressUpdate(el.id)} checked={el.checked} quantity={el.quantity} key={el.id} name={el.name} price={priceFormater(el.price)} id={el.id} onDelete={() => handleDelete(el.id)} />)
        })
        return n
    }

    const [rows, setRows] = useState(buildArray(data))
    const [adding, setAdding] = useState(false)
    const oldRowsRef = useRef([])

    useEffect(() => {
        buildRows(data)
    }, [data])

    const disableAdd = () => {
        setRows(s => {
            const n = [...s]
            
            return n.filter(d => {
                return d.key !== "add"
            })
        })
        setAdding(false)
    }

    

    const buildRows = (data) => {
        setRows(() => {
            const n = []
            data.forEach(el => {
                n.push(<ArticleRow course={dbKey === 'course'} onUpdate={() => handlePressUpdate(el.id)} checked={el.checked} quantity={el.quantity} key={el.id} name={el.name} price={priceFormater(el.price)} id={el.id} onDelete={() => handleDelete(el.id)} />)
            })
            return n
        })
    }

    const handleAddOk = async (name, price, quantity = null) => {
        try {
            
            const data = await get(dbKey) ?? []
            let id

            if (data.length === 0) {
                id = 1
            } else {
                id = data[data.length - 1].id + 1
            }

            const obj = {
                id,
                price,
                name,
                checked: false
            }

            if (quantity) {
                obj.quantity = quantity
            }
            
            data.push(obj)


            await save(dbKey, data)
            buildRows(data)
            disableAdd()
            if (afterChange) {
                afterChange(data)
            }

        } catch (e) {

        }
    }

    const handleDelete = async (id) => {
        try {
            const data = await get(dbKey) ?? []
            const filter = data.filter(el => el.id !== parseInt(id))
            await save(dbKey, filter)
            buildRows(filter)
            if (afterChange) {
                afterChange(filter)
            }

        } catch (e) {

        }
    }

    const handlePressUpdate = async (id) => {
        setRows(s => {
            const n = [...s]
            return n.map(el => {
                if (parseInt(el.key) === parseInt(id)) {
                    oldRowsRef.current.push(el)
                    const newRow = <ArticleRowForm defaultQuantity={el.props.quantity} course={dbKey === 'course'} key={id} defaultName={el.props.name} defaultPrice={el.props.price.substring(0, el.props.price.length - 2)} handleOk={(name, price, quantity) => handleUpdate(id, name, price, quantity)} handleNo={() => handleNotUpdate(id)} />
                    return newRow
                }
                return el
            })
        })
    }

    const handleUpdate = async (id, name, price, quantity = null) => {
        try {
            const dbData = await get(dbKey)
            const newData = dbData.map(el => {
                if (el.id === id) {
                    el.name = name
                    el.price = parseFloat(price)
                    if (quantity) {
                        el.quantity = quantity
                    }
                }
                return el
            })

            save(dbKey, newData)
            buildRows(newData)
            if (afterChange) {
                afterChange(newData)
            }
        } catch (e) {

        }
    }

    const handleNotUpdate = (id) => {
        setRows(s => {
            const n = [...s]

            return n.map(el => {
                if (parseInt(el.key) === parseInt(id)) {
                    let newRow
                    oldRowsRef.current.forEach((l, k) => {
                        if (l.key === el.key) {
                            newRow = oldRowsRef.current.splice(k, 1)
                        }
                    })
                    return newRow
                }
                return el
            })
        })
    }

    const handlePress = () => {
        
        setAdding(true)
        setRows(s => {
            const n = [...s]
            n.push(<ArticleRowForm course={dbKey === 'course'} handleOk={handleAddOk} handleNo={disableAdd} key={'add'} />)
            return n
        })
    }

    return {
        rows,
        adding,
        handlePress
    }



}