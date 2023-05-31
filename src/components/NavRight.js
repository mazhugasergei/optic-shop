// react
import { useEffect, useRef } from "react"
// images
import { ReactComponent as ArrowIcon } from "../assets/images/navigation/arrow.svg"

export default ({transition, colorsNames, currentSlide, setSlideDirection, setPreviousSlide, setCurrentSlide, colorsNav}) => {
  const navRight = useRef()

  const rightMenu = (e)=>{
    if(!document.querySelector('aside.left').contains(e.target) && e.target.checked){
      navRight.current.style.transform = "translate(0, -50%)"
      navRight.current.querySelector('svg').style.transform = "rotate(270deg) translateX(50%)"
      navRight.current.querySelectorAll('button').forEach(btn => {btn.tabIndex = 0})
      navRight.current.querySelectorAll('button').forEach(btn => {btn.ariaHidden = "visible"})
    }
    else{
      navRight.current.style.transform = "translate(" + (navRight.current.querySelector('.colorsCont').offsetWidth - 1) + "px, -50%)"
      navRight.current.querySelector('svg').style.transform = "rotate(90deg) translateX(-50%)"
      navRight.current.querySelectorAll('button').forEach(btn => {btn.tabIndex = -1})
      navRight.current.querySelectorAll('button').forEach(btn => {btn.ariaHidden = "hidden"})
    }
  }

  const onLoad = () => {
    // right navigation appearing
    navRight.current.style.transition = transition/1000 + "s"
    navRight.current.style.transitionDelay = transition/8000 + "s"
    navRight.current.style.transform = "translate(" + (navRight.current.querySelector('.colorsCont').offsetWidth - 1) + "px, -50%)"
    setTimeout(()=>{
      navRight.current.style.transition = transition/2000 + "s cubic-bezier(.84, 0, .6, 1)"
      navRight.current.style.transitionDelay = "0s"
    }, transition)
    // close right menu on outside click
    document.addEventListener("click", (e)=>{
      if(!navRight.current.querySelector('label').contains(e.target) && !navRight.current.querySelector('input').contains(e.target)){
        navRight.current.querySelector('input').checked = false
        rightMenu(e)
      }
    })
    // set right navigation event listener
    navRight.current.querySelector('input').addEventListener("change", rightMenu)
  }
  
  useEffect(()=>{
    // onLoad
    if(document.readyState === "complete") onLoad()
    else{
      window.addEventListener("load", onLoad)
      return () => window.removeEventListener("load", onLoad)
    }
  }, [])

  return (
    <aside ref={navRight} className="right">
      <div className="cont">
        <input type="checkbox" id="chooseColorNav" aria-label="Click to open or close colors menu"/>
        <label htmlFor="chooseColorNav">
          <ArrowIcon aria-hidden="true"/>
          <div aria-hidden="true">Choose a color</div>
        </label>
        <div className="colorsCont">{
          colorsNames.map((color, i) => (
            <div key={i}>
              <button htmlFor="chooseColorNav" tabIndex="-1" aria-hidden="true"
                onClick={
                  (e)=>{
                    if(currentSlide > i) setSlideDirection("up")
                    else setSlideDirection("down")
                    setPreviousSlide(currentSlide)
                    setCurrentSlide(i)
                  }
                }
                aria-label={"Switch to " + color + " glasses"}
              >
                <span>{ color }</span>
                <div className="color" style={{background: colorsNav[i]}}/>
              </button>
            </div>
          ))
        }</div>
      </div>
    </aside>
  )
}