import Lottie from "lottie-react"
import paperplane from "../public/paperplane.json"
import { useRef } from "react"
import { motion } from "framer-motion"

export default function SubmitButton() {
  const lottiePlane = useRef() as React.MutableRefObject<any>

  return (
    <motion.button
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -20, opacity: 0 }}
      onClick={() => lottiePlane.current.goToAndPlay(25, true)}
      type="submit"
      className="w-16"
    >
      <Lottie
        lottieRef={lottiePlane}
        animationData={paperplane}
        autoplay={false}
        loop={false}
        onComplete={() => lottiePlane.current.goToAndStop(0, true)}
      />
    </motion.button>
  )
}
