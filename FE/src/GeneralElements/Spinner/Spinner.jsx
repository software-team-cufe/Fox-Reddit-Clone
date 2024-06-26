import React from "react"

export default function Spinner({ className = "" }) {


    return (
        <div className={`w-100 h-100 flex flex-col items-center justify-center ${className}`}>
            <i className={`fa-solid fa-circle-notch animate-spin text-inherit `} />
        </div>
    )
}
