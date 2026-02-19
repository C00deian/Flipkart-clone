interface NullDataProps {
    title: string
}

import React from 'react'

const NullData: React.FC<NullDataProps> = ({title}) => {
  return (
      (
        <div className="w-full  h-[50px]  flex items-center justify-center text-xl md:2xl">
            <p className="font-medium">{title}</p>
        </div>
    )
  )
}

export default NullData