
import React, { useState } from 'react'
import { Check, Plus } from 'lucide-react'
function CheckButton(props) {      //inputs: SetIsChecked, IsChecked

    return (
        <button onClick={() => { props.IsChecked ? props.SetIsChecked(false) : props.SetIsChecked(true); }}
            className={`border rounded-full ml-5 p-2 ${props.IsChecked ?
                'bg-orange-600 text-white' : 'bg-white text-gray-500'} `}
        >
            <div className='flex'>
                {props.IsChecked && <Check strokeWidth={1} />}
                {!props.IsChecked && <Plus strokeWidth={1} />}
                {props.label}
            </div>
        </button>
    )
}

export default CheckButton