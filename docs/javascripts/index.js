import React from 'react'
import ReactDOM from 'react-dom'
import * as Components from '../../lib/index'

Array.from(document.querySelectorAll('[data-react-component][data-react-props]')).forEach((element) => {
  const props = JSON.parse(element.dataset.reactProps)
  const Component = Components[element.dataset.reactComponent]
  ReactDOM.render(<Component {...props} />, element)
})
