import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { init } from "onfido-sdk-ui"

function Redirect({ userIsAlreadyRegistered }) {
  const history = useHistory()
  useEffect(() => {
    const getToken = async () => {
      const newToken = await (await fetch("/createApplicant")).text()
      init({
        token: newToken,
        containerId: "onfido-mount",
        onComplete: function (data) {
          console.log("A completion message: ", data)
          setTimeout(() => {
            window.document.getElementById("onfido-mount").remove()
            history.push("/selected")
          }, 1000)
        },
        steps: userIsAlreadyRegistered
          ? ["face", "complete"]
          : ["welcome", "document", "face", "complete"],
      })
    }
    getToken()
  }, [])
  return <h2>Wait a second...</h2>
}

export default Redirect
