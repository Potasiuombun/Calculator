const calculator = document.getElementsByClassName("calculator")

const screens = document.getElementsByClassName('screen')
const text = document.createElement("h3");

let myNumbers = {
    nr1: 0,
    nr2: 0
}

let operation;
let dots = 0;

text.innerText=""
screens[0].appendChild(text)
console.log(screens)

//get the buttons and split them in 2 different button sets
const buttons = Array.from(document.querySelectorAll('button'))
const zero = buttons.filter(button=>button.dataset.zero !== undefined)
const numbers = buttons.filter(button=>button.dataset.number !== undefined)
const operators = buttons.filter(button=>button.dataset.operator !== undefined)
const equal = buttons.filter(button=>button.dataset.equal !== undefined)
const dot = buttons.filter(button=> button.dataset.dot !== undefined)
const clear = buttons.filter(button=> button.dataset.clear !== undefined)
//for some reason the same technique as above doesn't find the clearAll button
const clearAll = buttons[9]

console.log(clearAll)
//flags
var clicked_zero = false
var clicked_number = false
var clicked_operators = false
var clicked_equal = false
var clicked_dot = false
var clicked_false = false
var clicked_clearAll = false

// Functions
function zeroDark(zero){
    console.log(text.innerText.length)
    console.log("clicked numbers form zeroDark" + clicked_number)
    if(clicked_number === false && operation === undefined)
    {
        text.innerText = "0"
    }
    else{
        text.innerText+=zero.dataset.zero
    }
    clicked_zero = true
}
function clickNumbers(number)
{   
    clicked_zero = false
    clicked_number = true
    if(text.innerText ==="0")
    {
        text.innerText = ""
    }
    text.innerText+= number.dataset.number
    console.log("clicked numbers" +clicked_number)
}

function clickOperator(operator)
{
    if(clicked_number === true || clicked_zero === true){
        clicked_operators = true
        clicked_zero = false
        clicked_number = false
        clicked_dot = false
        operation = operator.dataset.operator
        console.log(operation)
        text.innerText+= " " + operator.dataset.operator + " "
    }
}

function clickDot(dot)
{   
    if (clicked_dot === true)
    {
        return
    }
    if(dots === 2){
        return
    }
    if (clicked_zero === true)
    {
        text.innerText += dot.dataset.dot
        dots++;
    }
    else if (clicked_number === false)
    {
        text.innerText += '0'
        text.innerText += dot.dataset.dot
        clicked_dot = true
        dots++;
    }
    else{
        text.innerText += dot.dataset.dot
        clicked_dot = true
        dots++
    }
}

function registerNumber(){
    let myNum= text.innerText.split(operation)
    myNumbers.nr1 = parseFloat(myNum[0])
    myNumbers.nr2 = parseFloat(myNum[1])
    console.log(myNumbers)
}

function multiplicate()
{
    return myNumbers.nr1 * myNumbers.nr2
}

function divide()
{   
    if (myNumbers.nr2 < 0.000000000001){
        return
    }
    return myNumbers.nr1 / myNumbers.nr2
}

function modulate(){
    return myNumbers.nr1 % myNumbers.nr2
}
function sumUp()
{
    return myNumbers.nr1 + myNumbers.nr2
}
function subtract()
{
    return myNumbers.nr1 - myNumbers.nr2
}


function clickEqual()
{   let ans;
    registerNumber()
    if (operation === 'X'){
        ans = multiplicate()
    }
    else if(operation === "/")
    {
        ans = divide()
    }
    else if(operation ==="%")
    {
        ans = modulate()
    }
    else if(operation ==="+")
    {
        ans = sumUp()
    }
    else  ans = subtract()

    myNumbers.nr1 = ans
    text.innerText = myNumbers.nr1
    myNumbers.nr2 = 0;
    let arr = Array.from(text.innerText)
    const found = arr.filter(element=> element === '.')
    if (found.length === 0){
        dots = 0
    }
    else dots = 1
    operation = undefined
    clicked_operators = false
    clicked_zero = false
}


function clearText(){
    console.log("clear text here");
    clicked_number = false
    clicked_zero = false
    clicked_operators = false
    clicked_dot = false
    text.innerText ="";
}

function deleteLast()
{
    let arr = Array.from(text.innerText)
    console.log(arr)
    arr.pop()
    const found = arr.filter(element=> element === '.')
    console.log(found.length)
    if (found.length === 0){
        clicked_dot = false
        dots--;
    }
    arr = arr.join('')
    text.innerText = `${arr}`
    console.log(found)
    if (text.innerText.length === 0)
    {
        clicked_number = false
        clicked_zero = false
        clicked_operators = false
        clicked_dot = false
        operation = 0
        dots = 0
        console.log("clicked_numbers" + clicked_number)
    }
}



// Event Listeners
numbers.forEach(number=> number.addEventListener('click',e=> clickNumbers(number)));
zero.forEach(zer=>zer.addEventListener('click',e=>zeroDark(zer)))
operators.forEach(operator => operator.addEventListener('click',e=> clickOperator(operator)));
equal[0].addEventListener('click',e=> clickEqual());
dot.forEach(d=> d.addEventListener('click',e=>clickDot(d)));
clear.forEach(cl=>cl.addEventListener('click',e=> deleteLast()));
clearAll.addEventListener('click',clearText);
