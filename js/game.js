'use strict'

const FLAG = '🏴‍☠️'
const ONE = '1️⃣'
const TWO = '2️⃣'
const THREE = '3️⃣'
const FOUR = '4️⃣'
const FIVE = '5️⃣'
const SIX = '6️⃣'
const SEVEN = '7️⃣'
const EIGHT = '8️⃣'
const MINE = '💣'
const EMPTY = ''
var lives = 3

var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2
}

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function onInit() {
    createBoard()
    renderBoard()
    // setMinesNegsCount(gBoard)
}

function createBoard() {
    for (let i = 0; i < gLevel.SIZE; i++) {
        gBoard.push([])
        for (let j = 0; j < gLevel.SIZE; j++) {
            const currCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            gBoard[i][j] = currCell
        }
    }
    // gBoard[0][1].isMine = true
    // gBoard[3][2].isMine = true
}

function renderBoard() {
    const board = document.querySelector('table')
    var strHTML = ''
    strHTML += '<tbody>'
    for (let i = 0; i < gLevel.SIZE; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < gLevel.SIZE; j++) {
            const className = `cell ${i}-${j}`
            strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" onmousedown="onCellClicked(this, event, ${i}, ${j})">${EMPTY}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += '</tbody>'
    board.innerHTML = strHTML
}

function onCellClicked(elCell, ev, i, j) {
    const click = ev.button
    if (click === 0) {
        if (checkIfFirstClick()) {
            const numOfMines = gLevel.MINES
            onLeftClick(elCell, i, j)
            randomMines(numOfMines)
            setMinesNegsCount(gBoard)
        }
        onLeftClick(elCell, i, j)
    }
    if (click === 2) {
        onCellMarked(elCell)
    }
    return
}

function onLeftClick(elCell, i, j) {
    if (gBoard[i][j].isMine) showMine(elCell, i, j)
    gBoard[i][j].isShown = true
    elCell.innerText = gBoard[i][j].minesAroundCount
}

function showMine(cell, i, j) {
    lives --
    cell.innerText = MINE
    gBoard[i][j].isShown = true
    setTimeout(() => {
        cell.innerText = '💥'
    }, 2500)
}

function onCellMarked(elCell) {
    const iIdxOfCell = elCell.dataset.i
    const jIdxOfCell = elCell.dataset.j

    if (gBoard[iIdxOfCell][jIdxOfCell].isMarked === false) {
        elCell.innerText = FLAG
        gBoard[iIdxOfCell][jIdxOfCell].isMarked = true
        return
    }
    if (gBoard[iIdxOfCell][jIdxOfCell].isMarked === true) {
        elCell.innerText = EMPTY
        gBoard[iIdxOfCell][jIdxOfCell].isMarked = false
    }
}

function setMinesNegsCount(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const currCell = board[i][j]
            currCell.minesAroundCount = countMinesAroundCell(i, j, currCell)
        }
    }
}

function countMinesAroundCell(rowIdx, colIdx, cell) {
    var counter = 0
    for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (let j = colIdx - 1; j <= colIdx + 1; j++) {
            if (gBoard[i][j] === cell) continue
            if (j < 0 || j >= gBoard.length) continue
            if (gBoard[i][j].isMine) counter++
        }
    }
    return counter
}



function checkGameOver() {
    if (gGame.secsPassed === 0 && (shownCount + markedCount) === gLevel.SIZE ** 2) (`You did it! you won!`)
    else console.log(`Time has run out and you haven't found all the cells yet. You lost.`)
}

function expandShown(board, elCell, i, j) {

}

// function setLevelSize(idxOfLevelSize) {
//     gGame.SIZE = SIZE[idxOfLevelSize]
//     createBoard()
// }

function randomMines(numOfMines) {
    while (numOfMines > 0) {
        const iIdxOfRandCell = getRandomIntInclusive()
        const jIdxOfRandCell = getRandomIntInclusive()
        gBoard[iIdxOfRandCell][jIdxOfRandCell].isMine = true
        console.log(iIdxOfRandCell, jIdxOfRandCell)
        numOfMines--
    }
}

function checkIfFirstClick() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            const currCell = gBoard[i][j]
            if (currCell.isShown) return false
        }
    }
    return true
}

function setLevelSize(numForMatrix, numOfMines) {
    gLevel.SIZE = numForMatrix
    gLevel.MINES = numOfMines
    onInit()
}