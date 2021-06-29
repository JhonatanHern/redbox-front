import React, { useState } from "react"
import { Link } from "react-router-dom"

const paragraph = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`

const documents = [
  { name: "Document #1", description: paragraph },
  { name: "Document #2", description: paragraph },
  { name: "Document #3", description: paragraph },
  { name: "Document #4", description: paragraph },
  { name: "Document #5", description: paragraph },
]

//✓ ✘
function Main({
  selectedIndexes,
  addIndex,
  removeIndex,
  userIsAlreadyRegistered,
  setUserIsAlreadyRegistered,
}) {
  return (
    <div id="main">
      <h1>Select the files you want</h1>
      {documents.map((doc, i) => {
        const selected = selectedIndexes.has(i)
        return (
          <div key={i} className={selected ? "selected" : ""}>
            <div>
              <h4>🗎 {doc.name}</h4>
              <p>{doc.description}</p>
            </div>
            {selected ? (
              <span onClick={() => removeIndex(i)}>✓</span>
            ) : (
              <span onClick={() => addIndex(i)}>✘</span>
            )}
          </div>
        )
      })}
      {selectedIndexes.size > 0 && (
        <>
          <p style={{ textAlign: "center", fontSize: "1.2em" }}>
            I have used this app in the past{" "}
            <input
              type="checkbox"
              checked={userIsAlreadyRegistered}
              onChange={() => setUserIsAlreadyRegistered(!userIsAlreadyRegistered)}
            />
          </p>
          <Link to="redirect" className="button-link">
            Register to buy document
          </Link>
        </>
      )}
    </div>
  )
}

export default Main
