function ToggleButton() {
    return (
        <div>
            <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" />

                <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
         peer-checked:bg-blue-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            </label>
        </div>
    )
}

export default ToggleButton