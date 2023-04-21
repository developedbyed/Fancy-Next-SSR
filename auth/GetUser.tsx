"use client"
import { useState } from "react"

const GetUser = () => {
  const [timeTaken, setTimeTaken] = useState(null)
  const getUser = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()
    if (data.timeTaken) {
      setTimeTaken(data.timeTaken)
    }
    console.log(data)
  }
  return (
    <div>
      <div></div>
      <div>
        <button onClick={() => getUser("/api/user-edge")}>
          Fetch User Edge ⚡
        </button>
        <p>{timeTaken}</p>
      </div>
    </div>
  )
}

export default GetUser
