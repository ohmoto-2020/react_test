import React from "react"

const FrameworkList = (props) => {
  if (!props.frameworks || !props.frameworks.length) {
    return <h1>No data !</h1>
  }

  return (
    <>
      <ul>
        {props.frameworks.map(({ id, item }) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </>
  )
}

export default FrameworkList
