# Explore Camera Thumbnail Demo

This demonstrates a thumbnail viewer for an Explore.org camera stream.

To use it, you will need to supply an Explore Server URL, a Client ID, and a Client Secret

<div data-react-component="Demo" data-react-props='{}'></div>

To query specific streams, you'll want to construct a URL using query parameters to limit the returned streams.  For example, to retrieve the data for the Streams 1 and 2, you'd build a URL like this:

https://example.com/streams.json?q[id_in][]=1&q[id_in][]=2

To retrieve the same data for a single stream, you can construct a URL using that Stream's ID:

https://example.com/streams/1.json
