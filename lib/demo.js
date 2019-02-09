const React = React || require('react')
const CameraVideoThumbnail = CameraVideoThumbnail || require('./camera_video_thumbnail')

const isEmpty = (string) => typeof(string) == 'undefined' || string == null || string == ''

class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {url: null, clientId: null, clientSecret: null, accessToken: null, streams: []}
  }

  onStreamsResponse ({streams}) {
    this.setState({streams})
  }

  onAccessToken() {
    const {url, accessToken} = this.state
    fetch(`${url}/streams.json`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(this.onStreamsResponse.bind(this))
  }

  onAccessTokenResponse({access_token}) {
    this.setState({accessToken: access_token}, this.onAccessToken.bind(this))
  }

  onUpdate () {
    const {url, clientId, clientSecret} = this.state
    if (isEmpty(url) || isEmpty(clientId) || isEmpty(clientSecret)) { return }

    fetch(`${url}/oauth/token`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    }).then(response => response.json()).then(this.onAccessTokenResponse.bind(this))
  }

  onClientIdChange ({target}) {
    const {value} = target
    this.setState({clientId: value}, this.onUpdate.bind(this))
  }

  onClientSecretChange ({target}) {
    const {value} = target
    this.setState({clientSecret: value}, this.onUpdate.bind(this))
  }

  onUrlChange ({target}) {
    const {value} = target
    this.setState({url: value}, this.onUpdate.bind(this))
  }

  render () {
    const {url, clientId, clientSecret, streams} = this.state
    return(
      <section className='demo'>
        <input className='demo__input' defaultValue={url} placeholder='URL' required onChange={this.onUrlChange.bind(this)} />
        <input className='demo__input' defaultValue={clientId} placeholder='Client ID' required onChange={this.onClientIdChange.bind(this)} />
        <input className='demo__input' defaultValue={clientSecret} placeholder='Client Secret' required onChange={this.onClientSecretChange.bind(this)} />
        {streams.map(stream => <CameraVideoThumbnail {...stream} />)}
      </section>
    )
  }
}

if (typeof(module) != 'undefined') {
  module.exports = Demo
}
