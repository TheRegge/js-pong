export default class Sound {
  constructor(audioContext) {
    this.context = audioContext
  }

  beep(duration, frequency) {
    const os = this.context.createOscillator()
    os.type = 'sine'
    os.frequency.value = frequency
    const g = this.context.createGain()
    os.connect(g)
    g.connect(this.context.destination)
    os.start(0)
    g.gain.exponentialRampToValueAtTime(
      0.00001,
      this.context.currentTime + duration
    )
  }
}
