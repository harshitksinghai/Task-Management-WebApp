import {useState, useEffect} from "react";

function UseScrollTop(threshold = 10) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const checkScroll = () => {
        if(window.scrollY > threshold){
            setScrolled(true);
        }
        else{
            setScrolled(false);
        }
      }
      window.addEventListener("scroll", checkScroll);
    
      return () => {
        window.addEventListener("scroll", checkScroll);
      }
    }, [threshold]);
    return scrolled;
}
export default UseScrollTop;