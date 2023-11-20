export function calcRsaCompte (rsa, compte) {
    const price = reducePrice(compte)
    return ((rsa - price) / 2)
}

export function calcListTotal (list, budget) {
    const price = reducePrice(list)
    return parseFloat(budget) - price
}

export function calcCourseFromList (list, budgetMois) {
    let course = null
    const words = ['course', 'courses', 'Course', 'Courses']

    list.forEach(el => {
        if (words.includes(el.name)) {
            course = el.price
        }
    })

    if (course === null) {
        course = calcListTotal(list, budgetMois)
    }
    
    return course
}

export function calcListCourseTotal (list, budget) {
    const price = list.reduce((acc, el) => {
        return  acc + (parseFloat(el.price) * parseInt(el.quantity))
    }, 0)
    return parseFloat(budget) - price
}

function reducePrice (data) {
    return data.reduce((acc, el) => {
        return acc + parseFloat(el.price)
    }, 0)
}