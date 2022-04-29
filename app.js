const CARDS = [
  {
    name: 'plane',
    image: './images/airplane.png'
  },
  {
    name: 'burger',
    image: './images/burger.png'
  },
  {
    name: 'house',
    image: './images/house.png'
  },
  {
    name: 'vehicle',
    image: './images/vehicle.png'
  },
  {
    name: 'ice-cream',
    image: './images/ice-cream.png'
  },
  {
    name: 'planet',
    image: './images/planet-earth.png'
  }
]

const PLAY_CARDS = [...CARDS, ...CARDS].sort(() => 0.5 - Math.random())

const backCardImage = './images/bg.png'
const emptyCardImage = './images/bg2.png'
const grid = document.querySelector('#grid')
const button = document.querySelector('#button')

let pairedCards = []
let fullResult = 0
let score = 0

const clearGrid = () => {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild)
  }
}

const createWinBox = () => {
  const winTopElement = document.createElement('div')
  winTopElement.textContent = `You win!`
  const winScoreElement = document.createElement('div')
  winScoreElement.textContent = `Your score is ${score / 2}`

  const winElement = document.createElement('div')
  winElement.appendChild(winTopElement)
  winElement.appendChild(winScoreElement)
  winElement.classList.add('win')

  grid.appendChild(winElement)

  button.textContent = 'Play again?'
}

const refreshPage = () => {
  score = 0
  fullResult = 0
  pairedCards = []

  clearGrid()
  createGrid()
}

const checkMatch = (cards, flipImage, isMatch = false) => {
  const timeout = setTimeout(() => {
    cards.forEach(card => {
      const choosenCard = document.querySelector(`[data-id="${card.i + 1}"]`)
      choosenCard.querySelector('img').setAttribute('src', flipImage)

      if (isMatch) {
        fullResult++

        choosenCard.removeEventListener('click', flipCard)
        choosenCard.style.pointerEvents = 'none'
      }

      if (fullResult === PLAY_CARDS.length) {
        clearGrid()
        createWinBox()
      }
    })

    pairedCards = []
  }, 500)

  return () => clearTimeout(timeout)
}

const flipCard = (i, name) => {
  score++

  const flippedCardImage = document.querySelector(`[data-id="${i + 1}"] img`)
  flippedCardImage.setAttribute('src', PLAY_CARDS[i].image)

  if (pairedCards.length && pairedCards[0].i === i) {
    alert("don't cheat me 😠")
    pairedCards = []
  }

  pairedCards.push({ i, name })

  if (pairedCards.length === 2 && pairedCards[0].name === pairedCards[1].name) {
    checkMatch(pairedCards, emptyCardImage, (isMatch = true))
  }

  if (pairedCards.length === 2 && pairedCards[0].name !== pairedCards[1].name) {
    checkMatch(pairedCards, backCardImage)
  }
}

const createGrid = () => {
  button.textContent = 'reload'
  button.addEventListener('click', refreshPage)

  PLAY_CARDS.forEach((card, index) => {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('src', backCardImage)

    const cardBox = document.createElement('div')
    cardBox.setAttribute('data-id', index + 1)
    cardBox.setAttribute('data-name', card.name)
    cardBox.appendChild(cardImage)
    cardBox.addEventListener('click', () => flipCard(index, card.name))

    grid.appendChild(cardBox)
  })
}

createGrid()
