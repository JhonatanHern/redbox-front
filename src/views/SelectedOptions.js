import React, { useState } from "react"

const documents = [
  { name: "Document #1" },
  { name: "Document #2" },
  { name: "Document #3" },
  { name: "Document #4" },
  { name: "Document #5" },
]

const downloadFile = (name) => {
  const link = document.createElement("a")
  link.href = "/sample.pdf"
  link.download = name
  link.dispatchEvent(new MouseEvent("click"))
}

let iframe

const printPdf = function () {
  if (!iframe) {
    iframe = document.createElement("iframe")
    document.body.appendChild(iframe)

    iframe.style.display = "none"
    iframe.onload = function () {
      setTimeout(function () {
        iframe.focus()
        iframe.contentWindow.print()
      }, 1)
    }
  }

  iframe.src = "/sample.pdf"
}

function SelectedOptions({ options, triggerDown }) {
  const [status, setStatus] = useState("files")
  const [name, setName] = useState("files")
  const [purchaseType, setPurchaseType] = useState(null)
  const startPurchase = (name, type) => {
    setPurchaseType(type)
    setStatus("payment")
    setName(name)
  }
  const endPurchase = () => {
    if (purchaseType === "Download") {
      downloadFile(name)
    } else {
      printPdf()
    }
    setStatus("files")
  }
  if (status === "payment") {
    return (
      <div id="chosen-files-payment">
        <h2>Enter Payment Details</h2>
        <input placeholder="1234 5678 9012 3456" />
        <input placeholder="CVS" className="cvs" />
        <input placeholder="Exp (MM/YY)" className="exp" />
        <button onClick={endPurchase}>Pay</button>
      </div>
    )
  }
  return (
    <div id="chosen-files">
      <h2>Chosen Files</h2>
      {Array.from(options).map((opt) => (
        <div className="document" key={opt}>
          🗎 {documents[opt].name}
          <div>
            <button onClick={() => startPurchase(documents[opt].name, "Print")}>🖨️ Print</button>
            <button onClick={() => startPurchase(documents[opt].name, "Download")}>
              ⬇️ Download
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SelectedOptions
