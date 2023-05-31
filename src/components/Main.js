// react
import { useEffect } from "react"
// images
import blackGlasses from "../assets/images/glasses/black.webp"
import blueGlasses from "../assets/images/glasses/blue.webp"
import redGlasses from "../assets/images/glasses/red.webp"
import greenGlasses from "../assets/images/glasses/green.webp"
import yellowGlasses from "../assets/images/glasses/yellow.webp"

export default ({transition}) => {
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

  return (
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
  )
}