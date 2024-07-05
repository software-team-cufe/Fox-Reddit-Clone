import React, { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import ComboBox from './ComboBox';
function Poll(props) {
    const [DisableAddOption, setDisableAddOption] = useState(false);
    const [focusOptions, setFocusOptions] = useState([false]);
    const [selectedOption, setSelectedOption] = useState(1);

    useEffect(() => {
        if (props.PollValues.length === 4)
            setDisableAddOption(true);
        else
            setDisableAddOption(false);

    }, [props.PollValues])

    const handleInputChange = (index, event) => {
        props.SetPollValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index].value = event.target.value;
            return updatedValues;
        });
    };

    const handleRemove = (index) => {
        props.SetPollValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues.splice(index, 1);
            return updatedValues;
        });
        setFocusOptions((prevFocusOptions) => {
            const updatedFocusOptions = [...prevFocusOptions];
            updatedFocusOptions.splice(index, 1);
            return updatedFocusOptions;
        });
    };

    const handleFocus = (index) => {
        setFocusOptions((prevFocusOptions) => {
            const updatedFocusOptions = [...prevFocusOptions];
            updatedFocusOptions[index] = true;
            return updatedFocusOptions;
        });
    };

    const handleBlur = (index) => {
        setFocusOptions((prevFocusOptions) => {
            const updatedFocusOptions = [...prevFocusOptions];
            updatedFocusOptions[index] = false;
            return updatedFocusOptions;
        });
    };

    const handleAddOption = () => {
        props.SetPollValues((prevValues) => [...prevValues, { value: '' }]);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (

        <div className='w-full'>
            <input value={props.Poll1} onChange={() => { props.SetPoll1(event.target.value) }}
                type="text" className="border rounded w-full h-10 my-1 border-gray-300 p-2
             focus:outline-none focus:border-gray-800" placeholder="Option 1" />
            <input value={props.Poll2} onChange={() => { props.SetPoll2(event.target.value) }}
                type="text" className="border rounded w-full h-10 my-1 border-gray-300 p-2
             focus:outline-none focus:border-gray-800" placeholder="Option 2" />

            {props.PollValues.map((value, index) => (
                <div className='w-full' key={index}>
                    <div
                        className={`flex border rounded p-1 w-[100%] h-fit my-2 
                        ${focusOptions[index] ? 'border-gray-800' : 'border-gray-300'
                            }`}
                    >
                        <input
                            type="text"
                            placeholder={`Option ${index + 3}`}
                            className="focus:outline-none border-none p-1 rounded border w-full h-10 focus:border-none"
                            onFocus={() => handleFocus(index)}
                            onBlur={() => handleBlur(index)}
                            value={value.value}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        <Trash2
                            onClick={() => handleRemove(index)}
                            className="my-2 hover:bg-gray-300 rounded"
                            color="gray"
                            strokeWidth={1}
                            size={24}
                        />
                    </div>
                </div>
            ))}
            <div className='flex gap-0 md:gap-40'>
                <button
                id='poll-submit'
                    onClick={handleAddOption}
                    type="submit"
                    disabled={DisableAddOption}
                    className="bg-white text-orange-600 font-bold text-xs rounded-full  p-1 px-2 m-1 
                 hover:bg-orange-100  disabled:text-gray-400 disabled:hover:bg-white"
                >
                    Add an option
                </button>
                <div className='text-sm h-6 flex '>
                    <p className='m-1 pt-2 text-xs'> Voting length:</p>
                    <ComboBox SelectedOption={props.VoteLength} SetSelectedOption={props.SetVoteLength} />
                </div>
            </div>

        </div>
    )
}

export default Poll