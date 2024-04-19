import React, { useState } from "react";

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleClick = (e, newActiveTab, num) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
        children[num].props.addOnClick();
    };


    return (
        <div className=" mx-auto">
            <div className="flex border-b border-gray-300">
                {children.map((child) => (
                    <button
                        disabled={child.props.enable}
                        key={child.props.label}
                        className={`disabled:bg-gray-300 rounded ${activeTab === child.props.label
                            ? "border-b-2 border-orange-500 bg-orange-100"
                            : ""
                            } flex-1  text-gray-700 font-medium py-2`}
                        onClick={(e) => { handleClick(e, child.props.label, child.props.num); }}
                    >
                        <div className="flex justify-center gap-1">
                            {child.props.icon}
                            {child.props.label}

                        </div>
                    </button>
                ))}
            </div>
            <div className="py-4">
                {children.map((child) => {
                    if (child.props.label === activeTab) {
                        return <div key={child.props.label}>{child.props.children}</div>;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

const Tab = ({ label, children }) => {
    return (
        <div label={label} className="hidden">
            {children}
        </div>
    );
};
export { Tabs, Tab };
