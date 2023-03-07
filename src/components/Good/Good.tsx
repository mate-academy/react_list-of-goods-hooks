import React from "react"

type GoodProps = {
  name: string,
}

export const Good:React.FC<GoodProps> = ({ name }) => {
  return (
    <>
    {name}
    </>
  )
}
