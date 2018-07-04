import React, { Component } from 'react'
import './Carousel.css'

class App extends Component {
	constructor(props) {
		super(props)

		var slideLength = this.props.images.length

		this.state = {
			indexes: {
				prev: slideLength - 1,
				current: 0,
				next: 1,
			}
		}
	}

	componentDidMount() {
		this.fixImagePosition()
		
		window.onresize = () => {
			this.fixImagePosition()
		}
	}

	fixImagePosition = () => {
		console.log(this.state.indexes)
		var slideContainer = document.getElementsByClassName(`carousel`)[0]

		var prevSlide      = document.getElementById(`slide${this.state.indexes.prev}`)
		var currentSlide   = document.getElementById(`slide${this.state.indexes.current}`)
		var nextSlide      = document.getElementById(`slide${this.state.indexes.next}`)
		
		var prevComputedStyle    = document.defaultView.getComputedStyle(prevSlide)
		var currentComputedStyle = document.defaultView.getComputedStyle(currentSlide)

		var slideContainerStyle  = document.defaultView.getComputedStyle(slideContainer)

		prevSlide.style.left    = `-${prevComputedStyle.width}`
		currentSlide.style.left = `calc(50% - ${currentComputedStyle.width.substr(0, currentComputedStyle.width.length - 2) / 2}px)`
		nextSlide.style.left    = slideContainerStyle.width
	}


	moveToNextSlide = () => {
		/*
			There's no need to change actual slide positions here if you 
			fix de position of the indexes after chaning the id
		*/

		//Changing index to slides
		this.setState(prev => {
			prev.indexes = this.updateIndexes(prev.indexes)

			return prev
		})

		this.fixImagePosition()
	}

	updateIndexes = (indexes) => {
		var numOfSlides = this.props.images.length
		for (var index of Object.keys(indexes)) {
			indexes[index] = indexes[index] + 1 > numOfSlides - 1 ? 0 : indexes[index] + 1
		}

		return indexes
	}

	
	render() {
		var slides = this.props.images
		
		return (
			<div id="debugger">
				<div className="carousel" onClick={this.moveToNextSlide}>
					<img 
						src={slides[this.state.indexes.prev]} 
						id={`slide${this.state.indexes.prev}`}
						onLoad={this.fixImagePosition}
						alt=""
					/>
				
					<img 
						src={slides[this.state.indexes.current]} 
						id={`slide${this.state.indexes.current}`}
						onLoad={this.fixImagePosition}
						alt=""
					/>

					<img 
						src={slides[this.state.indexes.next]} 
						id={`slide${this.state.indexes.next}`}
						onLoad={this.fixImagePosition}
						alt=""
					/>
				</div>
			</div>
		)
	}
}

export default App
