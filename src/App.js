import React from 'react'
import './App.css'
import bank from './bank'

class Pad extends React.Component {
  constructor (props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handlePlaySound = this.handlePlaySound.bind(this)
  }

  handleKeyPress (e) {
    if (e.keyCode === this.props.keyCode) {
      this.handlePlaySound()
    }
  }

  handlePlaySound (e) {
    const sound = document.getElementById(this.props.keyTrigger)
    sound.currentTime = 0
    sound.play()
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '))
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillMount () {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  render () {
    return (
      <div
        id={this.props.clipId}
        onClick={this.handlePlaySound}
        className={`drum-pad ${this.props.keyTrigger}`}
      >
        <audio
          className='clip'
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        {this.props.keyTrigger}
      </div>
    )
  }
}

class DrumPads extends React.Component {
  render () {
    const padBank = bank.map((drumObj, i, padBankArr) => {
      return (
        <Pad
          keyCode={padBankArr[i].keyCode}
          keyTrigger={padBankArr[i].keyTrigger}
          clipId={padBankArr[i].id}
          clip={padBankArr[i].url}
          updateDisplay={this.props.updateDisplay}
        />
      )
    })

    return <div className='drum-pads'>{padBank}</div>
  }
}

class Render extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      display: '',
      sliderVal: 0.5
    }
    this.displayClipName = this.displayClipName.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
  }

  displayClipName (name) {
    this.setState({
      display: name
    })
  }

  adjustVolume (e) {
    this.setState({
      sliderVal: e.target.value
    })
  }

  render () {
    const clips = [].slice.call(document.getElementsByClassName('clip'))
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal
    })

    return (
      <div className='flex-container'>
        <div className='machine'>
          <div className='panel'>
            <div>
              <p id='display'>{this.state.display}</p>
            </div>
          </div>

          <div id='drum-machine'>
            <DrumPads
              updateDisplay={this.displayClipName}
              clipVolume={this.state.sliderVal}
            />
          </div>
        </div>
      </div>
    )
  }
}

function App () {
  return (
    <div>
      <Render />
    </div>
  )
}

export default App
