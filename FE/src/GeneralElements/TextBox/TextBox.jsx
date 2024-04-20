/**
 * A customizable text input component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.role - The role attribute for the input element.
 * @param {string} props.id - The id attribute for the input element.
 * @param {string} props.backgroundColor - The background color of the input element.
 * @param {boolean} props.required - Whether the input is required.
 * @param {string} props.letterSpacing - The letter spacing of the input element.
 * @param {string} props.width - The width of the input element.
 * @param {string} props.textAlign - The text alignment of the input element.
 * @param {string} props.mb - The margin bottom of the input element.
 * @param {string} props.pattern - The pattern attribute for the input element.
 * @param {string} props.initialValue - The initial value of the input element.
 * @param {string} [props.label=""] - The label text for the input element.
 * @param {string} props.error - The error message for the input element.
 * @param {string} [props.name=""] - The name attribute for the input element.
 * @param {boolean} props.area - Whether the input is a textarea.
 * @param {string} [props.className=""] - The additional CSS class for the input element.
 * @param {number} props.minLength - The minimum length of the input value.
 * @param {number} props.maxLength - The maximum length of the input value.
 * @param {boolean} props.disabled - Whether the input is disabled.
 * @param {Object} props.reference - The reference object for the input element.
 * @param {string} [props.type=""] - The type attribute for the input element.
 * @param {Function} props.onChanged - The event handler for the input change event.
 * @param {string} props.value - The value of the input element.
 * @param {string} [props.placeholder=""] - The placeholder text for the input element.
 * @returns {JSX.Element} The rendered TextBox component.
 */
import React from "react";
export default function TextBox({ role, id, backgroundColor, required, letterSpacing, width, textAlign, mb, pattern, initialValue, label = "", error, name = "", area, className = "", minLength, maxLength, disabled, reference, type = "", onChanged, value, placeholder = "" }) {
    function input(e) {
        e.target.style.height = "";
        e.target.style.height =
            e.target.scrollHeight + "px";
    }

    return (
        <div className={className} style={{ marginBottom: mb, width: width }}>
            <label

                className={`block ${label && "mb-2"} text-sm font-medium `}
            >
                {label}
                {error && ` (${error})`}
            </label>

            {!area ? <input
                role={role}
                id={id}
                style={{
                    letterSpacing: letterSpacing,
                    width: width,
                    textAlign: textAlign,
                }}
                required={required}
                name={name}
                pattern={pattern}
                defaultValue={initialValue}
                minLength={minLength}
                maxLength={maxLength}
                ref={reference}
                disabled={disabled}
                placeholder={placeholder}
                type={type || "text"}

                onChange={onChanged}
                value={value}
                className={` ${backgroundColor || ""} border border-gray-300 text-[color:var(--text)] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  `} /> :
                <textarea
                    id={id}
                    style={{
                        letterSpacing: letterSpacing,
                    }}
                    pattern={pattern}
                    onInput={input}
                    name={name}
                    required={required}
                    defaultValue={initialValue}
                    minLength={minLength}
                    maxLength={maxLength}
                    ref={reference}
                    disabled={disabled}
                    placeholder={placeholder}
                    type={type || "text"}
                    onChange={onChanged}
                    value={value}
                    className={`  border border-gray-300 text-[color:var(--text)] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
                />}
        </div>

    )
}
