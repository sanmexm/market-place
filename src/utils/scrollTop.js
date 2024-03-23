import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollTop = () => {
  const pathName = useLocation();
  const onTop = () =>{
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    onTop()
  }, [pathName])
  return null
}

export default ScrollTop