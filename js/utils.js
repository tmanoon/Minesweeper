const gRandyBtn = document.querySelector('.img-button')
const gElTimerSpan = document.querySelector('.timer span')

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

function timeCounter() {
 
    gElTimerSpan.innerText = gGame.secsPassed
}

function showHints() {
    const hintsImages = document.querySelectorAll('.hintImg')
    for (let i = 0; i < hintsImages.length; i++) {
        if (hintsImages[i].style.display === 'none') hintsImages[i].style.display = 'inline-block'
    }
}

function turnOffAndRemoveHint() {
        const hintsImages = document.querySelectorAll('.hintImg')
        for (let i = 0; i < hintsImages.length; i++) {
            const currImage = hintsImages[i]
            if (currImage.style.backgroundColor === 'beige') {
                currImage.style.backgroundColor = 'transparent'
                currImage.style.display = 'none'
            }
        }
}