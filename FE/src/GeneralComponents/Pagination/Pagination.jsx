
export default function Pagination({ className = "", count = 0, current = 0, onChangePage }) {

    const validate = () => {
        if (current < 0 || current > count) {
            return false;
        }
        return true;
    }
    const next = () => {
        if (current < count && validate()) {
            onChangePage(current + 1);
        }
    }

    const prev = () => {
        if (current > 0 && validate()) {
            onChangePage(current - 1);
        }
    }
    if(count <= 1){
        return <></>
    }
    return (
        <nav aria-label="Page navigation example" className={className}>
            <ul className="list-none flex items-center -space-x-px h-8 text-sm flex-wrap justify-center">
                <li onClick={prev} className="flex select-none cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500  border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700     ">
                    <span className="sr-only">Previous</span>
                    <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                </li>

                {
                    [...new Array(count)].map((e, idx) => <li
                        key={idx}
                        onClick={() => onChangePage(idx + 1)}
                        className={`flex select-none cursor-pointer  items-center justify-center px-3 h-8 leading-tight ${current == idx + 1 ? " bg-white" : "text-gray-500 "}  border border-gray-300 hover:bg-gray-100 hover:text-gray-700`} >
                        {idx + 1}
                    </li>
                    )
                }

                <li onClick={next} className="flex select-none cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                    <span className="sr-only">Next</span>
                    <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                        />
                    </svg>

                </li>
            </ul>
        </nav>
    )
}
