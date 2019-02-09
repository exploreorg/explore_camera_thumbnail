describe('CameraVideoThumbnail', () => {
  let root, fakeHls

  beforeEach((done) => {
    root = document.querySelector('#jasmine_content')
    fakeHls = function () {}
    fakeHls.prototype.on = jasmine.createSpy('on')
    fakeHls.prototype.loadSource = jasmine.createSpy('loadSource')
    fakeHls.prototype.destroy = jasmine.createSpy('destroy')
    fakeHls.Events = Hls.Events
    ReactDOM.render(
      <CameraVideoThumbnail playlistUrl='http://example.com/video.m3u8' snapshotHost='example.org' hlsDriver={fakeHls} name='Good Times' placeholderUrl='http://example.com/bars.png' />,
      root
    )
    setImmediate(done)
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root)
  })

  it('renders a container', () => {
    expect(root.querySelector('.camera-video-thumbnail')).not.toBeNull()
  })

  it('renders an image', () => {
    expect(root.querySelector('.camera-video-thumbnail__image')).not.toBeNull()
  })

  it('renders an image with a blank source', () => {
    expect(root.querySelector('.camera-video-thumbnail__image').getAttribute('src')).toEqual('http://example.com/bars.png')
  })

  it('renders an image with an alternative description', () => {
    expect(root.querySelector('.camera-video-thumbnail__image').getAttribute('alt')).toEqual('Good Times')
  })

  it('binds the level load event', () => {
    expect(fakeHls.prototype.on).toHaveBeenCalledWith(Hls.Events.LEVEL_LOADED, jasmine.any(Function))
  })

  it('loads the url', () => {
    expect(fakeHls.prototype.loadSource).toHaveBeenCalledWith('http://example.com/video.m3u8')
  })

  describe('when the component has been unmounted', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root)
    })

    it('destroys the hls instance', () => {
      expect(fakeHls.prototype.destroy).toHaveBeenCalled()
    })
  })

  describe('when the level load handler is called', () => {
    beforeEach((done) => {
      const fakeFragment = { url: 'http://example.com/segments/1.ts' }
      fakeHls.prototype.on.calls.mostRecent().args[1]({}, { details: { fragments: [fakeFragment, {}, {}, {}] } })
      setImmediate(done)
    })

    it('sets the source of the image', () => {
      expect(root.querySelector('.camera-video-thumbnail__image').getAttribute('src')).toEqual('http://example.org/segments/1.ts.jpg')
    })
  })
})
