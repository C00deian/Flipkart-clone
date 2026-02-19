import React from 'react'
import { IconType } from 'react-icons'

interface StatusProps {
    text: string,
    icon: IconType,
    bg: string,   // e.g., "bg-rose-200"
    color: string // e.g., "text-rose-700"
}

export const Status: React.FC<StatusProps> = ({
    text,
    icon: Icon, // Alias Icon capital 'I' se hona chahiye taaki JSX me use ho sake
    bg,
    color
}) => {
    return (
        <div className={`
            ${bg}
            ${color}
            px-2            /* Thoda horizontal padding badhaya */
            py-1         /* Vertical padding thoda kam kiya */
            rounded    /* Badge usually pill-shaped hote hain */
            text-sm
            font-normal
            mt-1
            items-center
            gap-2
            flex
        `}>
          
            <div>
                {text}
            </div>
            <div>
<Icon size={15}/>
            </div>
 
           
             {/* Icon size text ke hisab se adjust kiya */}
        </div>
    )
}