import React, { useState } from "react"
/**
 * A toggle button component.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onToggle - The callback function to be called when the toggle button is clicked.
 * @returns {JSX.Element} The toggle button component.
 */
function ToggleButton({ onToggle, name, initial, disabled }) {
    const [trueFalse, setTrueFalse] = useState(initial);

    /**
     * Handles the toggle button click event.
     */
    const handleToggle = () => {
        const newState = !trueFalse;
        setTrueFalse(newState);
        if (onToggle)
            onToggle(newState); // Call the callback function with the new state
    };
    return (
        <div>
            <label className="relative inline-flex cursor-pointer items-center">
                <input id="toggleButton" disabled={disabled} checked={trueFalse} name={name} type="checkbox" className="peer sr-only" onChange={handleToggle} />

                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
         peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            </label>
        </div>
    );
}

export default ToggleButton;