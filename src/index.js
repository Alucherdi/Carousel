import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Carousel from './Carousel.jsx'
import registerServiceWorker from './registerServiceWorker'

import image from "./aws.png"
import image2 from "./34z.jpg"
import image3 from "./sms.png"

ReactDOM.render(
	<Carousel images={[image2, image, image3]}/>, 
	document.getElementById('root')
)

registerServiceWorker()