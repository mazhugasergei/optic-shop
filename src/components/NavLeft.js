// react
import { useEffect } from "react"
// images
import { ReactComponent as ArrowIcon } from "../assets/images/navigation/arrow.svg"

export default ({transition, slide, colors, currentSlide, setSlideDirection, setCurrentSlide}) => {
  const onLoad = () => {
    // left navigation appearing
    document.querySelector('aside.left').style.transition = transition/1000 + "s"
    document.querySelector('aside.left').style.transitionDelay = transition/4000 + "s"
    document.querySelector('aside.left').style.transform = "translateY(-50%)"
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
    <aside className="left">
      <div className="btn" onClick={slide} data-slide="up"><ArrowIcon /></div>
      <div className="nav">{
        colors.map((item, i) => (
          <div key={i}>
            <input type="radio" name="nav" id={"nav_" + i} defaultChecked = { i==0 ? "checked" : "" }
              onChange={(e)=>{
                if(currentSlide > i) setSlideDirection("up")
                else setSlideDirection("down")
                setCurrentSlide(i)
              }}
            />
            <label htmlFor={"nav_" + i}></label>
          </div>
        ))
      }</div>
      <div className="btn" onClick={slide} data-slide="down"><ArrowIcon /></div>
    </aside>
  )
}