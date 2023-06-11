// react
import { useEffect, useState } from "react"
// components
import BG from "./components/BG"
import Header from "./components/Header"
import NavRight from "./components/NavRight"
import NavLeft from "./components/NavLeft"
import CTA from "./components/CTA"
// images
import blackGlasses from "./assets/images/glasses/black.webp"
import blueGlasses from "./assets/images/glasses/blue.webp"
import redGlasses from "./assets/images/glasses/red.webp"
import greenGlasses from "./assets/images/glasses/green.webp"
import yellowGlasses from "./assets/images/glasses/yellow.webp"

const App = () => {
  const transition = 700
  const [previousSlide, setPreviousSlide] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState("down")
  const [autoTimeoutID, setAutoTimeoutID] = useState(0)
  const [isCalled, setIsCalled] = useState(false)
  const [isCalledTimeoutID, setIsCalledTimeoutID] = useState(false)
  const [isCalledToFalseTimeoutID, setIsCalledToFalseTimeoutID] = useState(false)
  const colorsNames = [ "black", "blue", "red", "green", "yellow" ]
  const colors = [ "#AAADB7", "#A5BBD1", "#D3A5A5", "#87C1AE", "#CECDAD" ]
  const colorsLenses = [ "#C3C5CC", "#C0CFDF", "#E0C0C0", "#ABD2C6", "#DADBC5" ]
  const colorsNav = [ "#141414", "#007AFF", "#FF3A2D", "#4CD964", "#FFCC00" ]
  const headlineText = [ "Exceptional<br>Build Quality", "Stand out<br>from the Crowd", "Look Cool<br>and Fashionable", "Plenty of color<br>options to choose", "You wont notice<br>they are on yours" ]
  const glassesText = [ "Premium", "Different", "Stylish", "Colourful", "Comfort" ]
  const paragraphText = [ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices vestibulum convallis. Etiam vulputate dolor sed dapibus malesuada. Suspendisse potenti.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices vestibulum convallis. Etiam vulputate dolor sed dapibus malesuada. Suspendisse potenti.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices vestibulum convallis. Etiam vulputate dolor sed dapibus malesuada. Suspendisse potenti.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices vestibulum convallis. Etiam vulputate dolor sed dapibus malesuada. Suspendisse potenti.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultrices vestibulum convallis. Etiam vulputate dolor sed dapibus malesuada. Suspendisse potenti." ]

  const doAnimation = () => {
    // setting bg
    document.querySelector('.bg').style.background = colors[currentSlide]
    document.querySelector('.bg div').style.height = "100%"
    if(slideDirection == "up"){
      document.querySelector('.bg div').style.top = "unset"
      document.querySelector('.bg div').style.bottom = "0"
    }
    if(slideDirection == "down"){
      document.querySelector('.bg div').style.bottom = "unset"
      document.querySelector('.bg div').style.top = "0"
    }
    document.querySelector('.bg div').style.background = colors[previousSlide]
    setTimeout(()=>{
      document.querySelector('.bg div').style.transition = transition/1000 + "s"
      document.querySelector('.bg div').style.height = "0"
    })
    setTimeout(()=>{
      document.querySelector('.bg div').style.transition = "0s"
    }, transition)
    // setting text
    document.querySelectorAll('.text').forEach(text => {
      // create new text element
      let new_text = document.createElement('span')
      if(text.classList.contains('headline')) new_text.innerHTML = headlineText[currentSlide]
      if(text.classList.contains('glasses')) new_text.innerText = glassesText[currentSlide]
      if(text.classList.contains('num')) new_text.innerText = "0" + (currentSlide+1) + "/0" + headlineText.length
      if(text.classList.contains('paragraph')) new_text.innerText = paragraphText[currentSlide]
      new_text.style.transition = transition/1000 + "s"
      setTimeout(()=>{ new_text.style.opacity = 1 })
      if(slideDirection == "up") text.appendChild(new_text)
      if(slideDirection == "down") text.insertBefore(new_text, text.firstChild)
      // move text & delete old text element
      if(text.querySelectorAll('span').length > 1){
        if(slideDirection == "up") text.querySelectorAll('span')[0].style.position = "absolute"
        if(slideDirection == "down") text.querySelectorAll('span')[1].style.position = "absolute"
        if(slideDirection == "up") text.querySelectorAll('span')[0].style.bottom = "100%"
        if(slideDirection == "down") text.querySelectorAll('span')[1].style.top = "100%"
        setTimeout(()=>{
          if(slideDirection == "up") text.querySelectorAll('span')[0].style.opacity = 0
          if(slideDirection == "down") text.querySelectorAll('span')[1].style.opacity = 0
          if(slideDirection == "up") text.querySelectorAll('span')[0].style.transition = transition/2000 + "s ease-in"
          if(slideDirection == "down") text.querySelectorAll('span')[1].style.transition = transition/2000 + "s ease-in"
          if(slideDirection == "up") text.querySelectorAll('span')[0].style.marginBottom = "5%"
          if(slideDirection == "down") text.querySelectorAll('span')[1].style.marginTop = "5%"
        })
        text.style.transition = "0s"
        if(slideDirection == "up") text.style.top = "100%"
        if(slideDirection == "down") text.style.top = "-100%"
        setTimeout(()=>{
          text.style.transition = transition/1000 + "s"
          text.style.top = "0"
        })
        setTimeout(()=>{
          text.style.transition = "0s"
          text.style.top = "0"
          if(slideDirection == "up") text.querySelectorAll('span')[0].remove()
          if(slideDirection == "down") text.querySelectorAll('span')[1].remove()
          text.querySelector('span').style.position = "static"
        }, transition)
      }
    })
    // set lenses & text style
    document.querySelectorAll('.lense').forEach(lense => {
      lense.style.background = colorsLenses[currentSlide]
      lense.querySelector('.text').style.right = lense.offsetLeft + "px"
    })
    // set glasses img
    document.querySelectorAll('.glasses-cont .images img').forEach(glasses => { glasses.style.opacity = 0 })
    setTimeout(()=>{ document.querySelectorAll('.glasses-cont .images img')[currentSlide].style.opacity = 1 })
  }

  const autoAnimation = () => {
    setPreviousSlide(currentSlide)
    setCurrentSlide(currentSlide + 1)
  }

  const onLoad = () => {
    // set glasses text event listener
    window.addEventListener("mousemove", (e) => {
      document.querySelectorAll('.glasses-cont .text').forEach(text => {
        text.style.transition = transition/1000 + "s linear"
        text.style.transform = "translate(calc(" +
          " -0.03 * (" + e.clientX + "px - 50vw) " // X
          + "), calc(" +
          " -0.03 * (" + e.clientY + "px - 50vh) " // Y
          + "))"
      })
    })
    // set glasses images style
    document.querySelectorAll('.glasses-cont .images img').forEach(glasses => {
      glasses.style.transition = transition/2000 + "s"
      glasses.style.transitionDelay = transition/6000 + "s"
    })
    // set lenses style
    document.querySelectorAll('.lense').forEach(lense => {
      lense.style.transition = transition/3000 + "s"
      lense.style.transitionDelay = transition/5000 + "s"
    })
    // set glasses-cont style
    document.querySelector('.glasses-cont').style.transition = transition/2000 + "s"
    document.querySelector('.glasses-cont').style.transitionDelay = transition/5000 + "s" 
    document.querySelector('.glasses-cont').style.transform = "translateY(0)"
    document.querySelector('.glasses-cont').style.opacity = 1
  }

  useEffect(()=>{
    // onLoad
    if(document.readyState === "complete") onLoad()
    else{
      window.addEventListener("load", onLoad)
      return () => window.removeEventListener("load", onLoad)
    }
  }, [])

  const onSlideChange = () => {
    // recalculate currentSlide
    if(currentSlide < 0) setCurrentSlide(4)
    else if(currentSlide > 4) setCurrentSlide(0)
    else{
      // autoAnimation
      clearTimeout(autoTimeoutID)
      setAutoTimeoutID(setTimeout(autoAnimation, 10000))
      // animation
      if(!isCalled){
        setIsCalled(true)
        setPreviousSlide(currentSlide)
        doAnimation()
        setPreviousSlide(currentSlide)
        setIsCalledToFalseTimeoutID(setTimeout(()=>{setIsCalled(false)}, transition))
      }
      else{
        clearTimeout(isCalledTimeoutID)
        clearTimeout(isCalledToFalseTimeoutID)
        setIsCalledTimeoutID(setTimeout(()=>{
          setPreviousSlide(currentSlide)
          doAnimation()
        }, transition))
        setIsCalledToFalseTimeoutID(setTimeout(()=>{setIsCalled(false)}, transition*2))
      }
      // change left nav bullet color
      document.querySelectorAll('aside.left input')[currentSlide].checked = true
    }
  }

  useEffect(()=>{
    if(document.readyState === "complete") onSlideChange()
    else{
      window.addEventListener("load", onSlideChange)
      return () => window.removeEventListener("load", onSlideChange)
    }
  }, [currentSlide])
  
  const slide = (e) => {
    if(e.target.dataset.slide == "up"){
      setSlideDirection("up")
      setCurrentSlide(currentSlide - 1)
      document.querySelectorAll('aside.left input')[currentSlide].checked = false
    }
    if(e.target.dataset.slide == "down"){
      setSlideDirection("down")
      setCurrentSlide(currentSlide + 1)
      document.querySelectorAll('aside.left input')[currentSlide].checked = false
    }
  }

  return (
    <>
      <BG {...{transition, colors, currentSlide}} />

      <Header transition={transition} />

      <section className="main">
        <div className="headline-cont">
          <div className="text headline"><span></span></div>
        </div>
        <div className="glasses-cont" aria-hidden="true">
          <div className="text glasses"><span></span></div>
          <div className="lenses">
            <div className="lense">
              <div className="text glasses"><span></span></div>
            </div>
            <div className="lense">
              <div className="text glasses"><span></span></div>
            </div>
          </div>
          <div className="images">
            <img src={blackGlasses}/>
            <img src={blueGlasses}/>
            <img src={redGlasses}/>
            <img src={greenGlasses}/>
            <img src={yellowGlasses}/>
          </div>
        </div>
        <div className="num-cont">
          <div className="text num"><span></span></div>
        </div>
        <div className="paragraph-cont">
          <div className="text paragraph"><span></span></div>
        </div>
      </section>

      <NavLeft {...{transition, slide, colors, currentSlide, setSlideDirection, setCurrentSlide}} />

      <NavRight {...{transition, colorsNames, currentSlide, setSlideDirection, setPreviousSlide, setCurrentSlide, colorsNav}} />

      <CTA {...{transition, slide}} />
    </>
  )
}

export default App