// react
import { useEffect, useRef } from "react"
// images
import { ReactComponent as Logo } from "../assets/images/logo.svg"

export default ({ transition }) => {
  const headerRef = useRef()

  const onLoad = () => {
    // header appearing
    headerRef.current.style.transition = transition/1000 + "s"
    headerRef.current.style.transform = "translate(0)"
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
    <header ref={headerRef} className="wrapper">
      <div className="wrapper">
        <nav>
          <a href="/" aria-label="Glasses">Glasses</a>
          <a href="/" aria-label="About">About</a>
          <a href="/" aria-label="Contact">Contact</a>
        </nav>
        <a className="logo" href="/" aria-label="Optic Shop Logo"><Logo aria-hidden="true" /></a>
      </div>
    </header>
  )
}