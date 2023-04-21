"use client"
import { useState } from "react"

const GetUser = () => {
  const [timeTaken, setTimeTaken] = useState(null)
  const getUser = async () => {
    const res = await fetch("/api/user")
    const data = await res.json()
    if (data.timeTaken) {
      setTimeTaken(data.timeTaken)
    }
  }
  return (
    <div>
      <button onClick={getUser} className="bg-blue-700 text-lg">
        Fetch User
      </button>
      <p>{timeTaken}</p>
    </div>
  )
}

export default GetUser
