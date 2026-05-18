import { useEffect, useRef, useState } from "react"
import useThrottle from "../hooks/useThrottle"

const ThrottlePage = () => {
    const [scrollY, setScrollY] = useState(0)
    const throttledScrollY = useThrottle(scrollY, 2000)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(()=>{
        const handleScroll = () => {
            if(timerRef.current !== null) return
            timerRef.current = setTimeout(() => {
                setScrollY(window.scrollY)
                timerRef.current = null
            }, 2000)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])

    console.log("리렌더링")

  return (
    <div className="h-dvh flex flox-col items-center justify-center">
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>ScrollY:{throttledScrollY}px</p>
    </div>
  )
}

export default ThrottlePage