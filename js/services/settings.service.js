'use strict'


function SetColors(ev, elForm) {
    // ev.preventDefault()
    // console.log(ev)
    // console.log(elForm)
    const inputs = elForm.querySelectorAll('input')
    // console.log(inputs)
    const userPrefrences = Array.from(inputs).map(input => { return { [input.name]: input.value } })
    // console.log(userPrefrences)
    var strs = []
    userPrefrences.forEach((obj) => strs.push(Object.keys(obj)[0]))
    // console.log(strs)
    var userPrefObj = {}
    userPrefrences.forEach((obj, idx) => userPrefObj[strs[idx]] = obj[strs[idx]])
    gShape.borderColor = userPrefObj.borderColor
    gShape.fillColor = userPrefObj.fillColor
    // console.log(userPrefObj)
    // const elbody = document.querySelector('body')
    // elbody.style.backgroundColor = userPrefObj.backgroundColor
    // elbody.style.color = userPrefObj.textColor
    saveToStorage('userPrefObj', userPrefObj)
}

function loadPrefFromStorage() {
    gShape.borderColor = loadFromStorage('userPrefObj').borderColor
    gShape.fillColor = loadFromStorage('userPrefObj').fillColor
}

function setShape(shape){
    gCurrShape = shape
    console.log(gShape)
}