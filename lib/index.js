const CameraVideoThumbnail = CameraVideoThumbnail || require('./camera_video_thumbnail')
const Demo = Demo || require('./demo')

if (typeof(module) != 'undefined') {
  module.exports = {CameraVideoThumbnail, Demo}
}
