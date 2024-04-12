
import React, { useState } from 'react'
import { Check, Plus } from 'lucide-react'
function CheckButton(props) {
    const [IsChecked, setIsChecked] = useState(false);
    return (
        <button className={`border rounded-full ml-5 p-2 ${IsChecked ? 'bg-orange-600 text-white' : 'bg-white text-gray-500'} `}
            onClick={() => { IsChecked ? setIsChecked(false) : setIsChecked(true) }}>
            <div className='flex'>
                {IsChecked && <Check strokeWidth={1} />}
                {!IsChecked && <Plus strokeWidth={1} />}
                {props.label}
            </div>
        </button>
    )
}

export default CheckButton