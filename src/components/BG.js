// react
import { useEffect } from "react"

export default ({transition, colors, currentSlide}) => {
  const onLoad = () => {
    // bg appearing
    document.querySelectorAll('.bg').forEach(bg => {
      bg.style.background = colors[currentSlide]
      setTimeout(()=>{
        bg.style.transition = transition/1000 + "s"
        bg.style.transform = "translateY(0)"
      })
      setTimeout(()=>{ bg.style.transition = "0s" }, transition)
    })
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
    <div className="bg"><div/></div>
  )
}