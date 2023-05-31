// react
import { useEffect, useRef } from "react"
// images
import { ReactComponent as ArrowIcon } from "../assets/images/navigation/arrow.svg"

export default ({transition, slide}) => {
  const ctaRef = useRef()

  const onLoad = () => {
    // CTA appearing
    ctaRef.current.style.transition = transition/1000 + "s"
    ctaRef.current.style.transitionDelay = transition/2000 + "s"
    ctaRef.current.style.transform = "translate(-50%, 0)"
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
    <section ref={ctaRef} className="cta wrapper">
      <div className="line"></div>
      <div className="btn-outline" onClick={slide} data-slide="up"><ArrowIcon /></div>
      <a className="btn" href="/">Get Yours</a>
      <div className="btn-outline" onClick={slide} data-slide="down"><ArrowIcon /></div>
      <div className="line"></div>
    </section>
  )
}