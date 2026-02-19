
import React from 'react'

interface ContainerProps  {
    children : React.ReactNode
}

const Container : React.FC<ContainerProps> = ({children}) => {
  return (
     <div className="flex justify-center">
      <div className="w-full max-w-[1248px]">
        {children}
      </div>
    </div>
  )
}

export default Container