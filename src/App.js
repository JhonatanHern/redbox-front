import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Main from "./views/Main"
import Redirect from "./views/Redirect"
import SelectedOptions from "./views/SelectedOptions"

function App() {
  const [selectedIndexes, setSelectedIndexes] = useState(new Set())
  const [userIsAlreadyRegistered, setUserIsAlreadyRegistered] = useState(false)
  const addIndex = (i) => {
    const newSet = new Set(selectedIndexes)
    newSet.add(i)
    setSelectedIndexes(newSet)
  }
  const removeIndex = (i) => {
    const newSet = new Set(selectedIndexes)
    newSet.delete(i)
    setSelectedIndexes(newSet)
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Main
                selectedIndexes={selectedIndexes}
                addIndex={addIndex}
                removeIndex={removeIndex}
                setUserIsAlreadyRegistered={setUserIsAlreadyRegistered}
                userIsAlreadyRegistered={userIsAlreadyRegistered}
              />
            )}
          />
          <Route
            exact
            path="/redirect"
            component={() => <Redirect userIsAlreadyRegistered={userIsAlreadyRegistered} />}
          />
          <Route
            exact
            path="/selected"
            component={() => <SelectedOptions options={selectedIndexes} />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
