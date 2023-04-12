import body from "./body.html"

import "./index.css"

const BDAY = new Date("2001-05-21")

document.body.innerHTML = body

const ageValueElement  = document.getElementById("age-value")
const agePluralElement = document.getElementById("age-plural")

const ageValue  = evalAge()
const agePlural = evalAgePlural(ageValue)

ageValueElement.innerHTML  = ageValue
agePluralElement.innerHTML = agePlural

function evalAge() {
    const now          = new Date()
    const milliseconds = now          - BDAY
    const seconds      = milliseconds / 1000
    const minutes      = seconds      / 60
    const hours        = minutes      / 60
    const days         = hours        / 24
    const years        = days         / 365

    return Math.floor(years)
}

function evalAgePlural(age) {
    age = Math.abs(age)

    if (10 < age && age < 20)
        return "лет"

    const mod = age % 10

    if (mod === 1)
        return "год"

    if (1 < mod && mod < 5)
        return "года"

    return "лет"
}