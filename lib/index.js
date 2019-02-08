const React = React || require('react')
const Hls = Hls || require('hls.js')

class CameraVideoThumbnail extends React.Component {
  constructor (props) {
    const { src } = props
    super(props)
    this.state = { src, hls: null }
  }

  componentDidMount () {
    const { url, hlsDriver = Hls } = this.props
    const Driver = hlsDriver
    const hls = new Driver()
    hls.on(Driver.Events.LEVEL_LOADED, this.onLevelLoaded.bind(this))
    hls.loadSource(url)
    this.setState({ hls })
  }

  componentWillUnmount () {
    let { hls } = this.state
    if (hls === null) { return }
    hls.destroy()
    this.setState({ hls: null })
  }

  onLevelLoaded (_event, { details: { fragments = [] } }) {
    const { host } = this.props
    const lastFragment = fragments.reverse()[3]
    const { url } = lastFragment
    const parsedUrl = new URL(url)
    parsedUrl.hostname = host
    this.setState({ src: `${parsedUrl.href}.jpg` })
  }

  render () {
    const { name } = this.props
    const { src } = this.state
    return (
      <article className='camera-video-thumbnail'>
        <img className='camera-video-thumbnail__image' src={src} alt={name} />
      </article>
    )
  }
}

if (typeof(module) != 'undefined' && typeof(module.exports) != 'undefined') {
  module.exports = {CameraVideoThumbnail}
}
