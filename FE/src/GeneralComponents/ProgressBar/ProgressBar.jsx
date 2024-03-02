
export default function ProgressBar({ value, showValue, text }) {
    value = value > 100 ? 100 : value;
    return (
        <div className="w-full bg-gray-200 rounded-full mt-4 min-h-[10px]">
            {
                value > 1 &&
                <div className="bg-[color:var(--primary)] text-xs min-h-[10px] transition ease-in-out delay-150 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${value}%` }}
                >
                    <p className="">
                        {showValue && `${value}%`}
                        {text}
                    </p>
                </div>
            }
        </div>
    )
}
