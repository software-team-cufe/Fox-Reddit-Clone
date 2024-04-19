/**
 * ComboBox component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.role - The role attribute for accessibility.
 * @param {Array} props.items - The array of items for the select options.
 * @param {string} props.title - The title for the ComboBox.
 * @param {string} props.selected - The default selected value for the ComboBox.
 * @param {string} props.className - The additional CSS class name for the ComboBox.
 * @returns {JSX.Element} The ComboBox component.
 */
import React from "react";
export default function ComboBox({ role, items = [], title, selected, className = "", }) {

    return (
        <div className="h-full">
            {
                title && <label htmlFor="countries" className="block mb-2 text-sm font-medium ">{title}</label>
            }
            <select defaultValue={selected} role={role} id="countries" className={`${className} p-3  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full`}>
                {
                    items.map((e, idx) => <option key={idx} value={e.value}>{e.text}</option>)
                }

            </select>
        </div>

    )
}
