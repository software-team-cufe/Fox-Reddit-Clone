import React, { useState } from "react";

const Tabs = ({ children, addOnclick }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    };

    return (
        <div className=" mx-auto">
            <div className="flex border-b border-gray-300">
                {children.map((child) => (
                    <button

                        key={child.props.label}
                        className={`${activeTab === child.props.label
                            ? "border-b-2 border-orange-500"
                            : ""
                            } flex-1  text-gray-700 font-medium py-2`}
                        onClick={(e) => { handleClick(e, child.props.label); addOnclick; }}
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
