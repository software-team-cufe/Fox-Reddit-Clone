
/**
 * Checkbox component.
 *
 * @component
 * @param {string} className - Additional CSS class for the checkbox container.
 * @param {string} id - ID attribute for the checkbox input element.
 * @param {string} defaultValue - Default value for the checkbox input element.
 * @param {boolean} defaultChecked - Specifies whether the checkbox is checked by default.
 * @param {string} text - Text to display next to the checkbox.
 * @param {string} name - Name attribute for the checkbox input element.
 * @returns {JSX.Element} Checkbox component.
 */
export default function CheckBox({ className = "", id, defaultValue, defaultChecked, text = "", name = "" }) {

    id = id || `${Math.random() * Math.random()}`;
    return (
        <div className={className}>
            <input
                id={id}
                type="checkbox"
                defaultValue={defaultValue}
                name={name}
                defaultChecked={defaultChecked}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500   focus:ring-2  "
            />
            <label
                htmlFor={id}
                className="ml-2 text-sm font-medium "
            >
                {text}
            </label>
        </div>
    )
}
