
export default function ComboBox({ items = [], title, selected, className = "", }) {
    
    return (
        <div className="h-full">
            {
                title && <label htmlFor="countries" className="block mb-2 text-sm font-medium ">{title}</label>
            }
            <select defaultValue={selected} id="countries" className={`${className} p-3  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full`}>
                {
                    items.map((e, idx) => <option key={idx} value={e.value}>{e.text}</option>)
                }

            </select>
        </div>

    )
}
