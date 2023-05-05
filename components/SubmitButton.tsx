import Lottie from "lottie-react"
import paperplane from "../public/paperplane.json"
import { useRef } from "react"

export default function SubmitButton() {
  const lottiePlane = useRef() as React.MutableRefObject<any>

  return (
    <button
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
    </button>
  )
}
