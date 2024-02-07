const gRandyBtn = document.querySelector('.img-button')

function getRandomIntInclusive(min = 0, max = gBoard.length - 1) {
    return Math.floor(Math.random() * (max - min) + min)
}

function renderCell(location, value) {
    const cell = document.querySelector(`.cell ${location.i}-${location.j}`)
    cell.innerHTML = value
}

function disableMenu(ev) {
    ev.preventDefault()
}

function returnToRegularExpression() {
    const img = document.querySelector('.img-button')
    img.src = '../icons/regular-randy.png'
}

function timer() {
    const spanForTimer = document.querySelector('.timer span')
    spanForTimer.innerText = gGame.secsPassed
}