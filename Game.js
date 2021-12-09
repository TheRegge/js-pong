import Ball from './Ball.js'
import Paddle from './Paddle.js'
export default class Game {
  constructor() {
    this.ball = new Ball(document.getElementById('ball'))
    this.playerPaddle = new Paddle(document.getElementById('player-paddle'))
    this.computerPaddle = new Paddle(document.getElementById('computer-paddle'))
    this.playerScoreElem = document.getElementById('player-score')
    this.computerScoreElem = document.getElementById('computer-score')
    document.addEventListener('mousemove', (e) => {
      if (this.status === status.PAUSED) return
      this.playerPaddle.position = (e.y / window.innerHeight) * 100
    })
  }

  start = () => {
    window.requestAnimationFrame(this.update)
  }
  update = (time) => {
    window.requestAnimationFrame(this.update)
  }
    if (this.lastTime != null) {
      const delta = time - this.lastTime

      this.ball.update(delta, [
        this.playerPaddle.rect(),
        this.computerPaddle.rect(),
      ])
      this.computerPaddle.update(delta, this.ball.y)
      const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--hue')
      )
      document.documentElement.style.setProperty('--hue', hue + delta * 0.005)

      if (this.isLose()) this.handleLose()
    }
    window.requestAnimationFrame(this.update)
  }
  }

  isLose = () => {
    const rect = this.ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
  }

  handleLose = () => {
    const rect = this.ball.rect()
    if (rect.right > window.innerWidth) {
      this.playerScoreElem.textContent =
        parseInt(this.playerScoreElem.textContent) + 1
    } else {
      this.computerScoreElem.textContent =
        parseInt(this.computerScoreElem.textContent) + 1
    }
    this.ball.reset()
    this.computerPaddle.reset()
  }
}