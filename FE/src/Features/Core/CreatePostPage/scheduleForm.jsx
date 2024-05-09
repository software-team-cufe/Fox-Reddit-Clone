import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Clock } from "lucide-react";
import moment from 'moment-timezone';
import { Switch } from '@headlessui/react'
import { set } from "zod";

const timeZoneOptions = moment.tz.names().map(tz => {
    return { value: tz, label: tz }
});

timeZoneOptions.forEach(tz => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    tz.label += ` (UTC ${offset >= 0 ? '-' : '+'}${Math.abs(offset / 60)})`;
});

const repeatOptions = [
    { value: 'none', label: 'Does not repeat' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
];

const advanced1Options = [
    { value: 'default', label: 'Default comment order' },
    { value: 'best', label: 'Best' },
    { value: 'new', label: 'New' },
    { value: 'hot', label: 'Hot' },
    { value: 'top', label: 'Top' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'old', label: 'Old' },
    { value: 'QA', label: 'Q&A' },
];

const advanced2Options = [
    { value: 'notSticky', label: 'Not a sticky post' },
    { value: 'firstSticky', label: 'Submit as first sticky post' },
    { value: 'secondSticky', label: 'Submit as second sticky post' },
];

export default function ScheduleForm({ onClose, setStartDate, setStartTime, setTimeZone, setRepeat, setAdv1, setAdv2, setContestEnable, setAutoMod, startDate, startTime, timeZone, repeat, adv1, adv2, contestEnable, autoMod }) {

    const CustomInputDate = React.forwardRef(({ value, onClick }, ref) => (
        <div className="relative">
            <input className="relative w-32 text-sm p-1 border border-opacity-15 border-black" onClick={onClick} value={value} ref={ref} readOnly />
            <Calendar className="absolute right-0 top-0 h-full w-6 p-1" />
        </div>
    ));

    const CustomInputTime = React.forwardRef(({ value, onClick }, ref) => (
        <div className="relative">
            <input className="relative w-32 text-sm p-1 border border-opacity-15 border-black" onClick={onClick} value={value} ref={ref} readOnly />
            <Clock className="absolute right-0 top-0 h-full w-6 p-1" />
        </div>
    ));

    const handleCancel = () => {
        setStartDate(new Date());
        setStartTime(new Date());
        setTimeZone(timeZoneOptions[0]);
        setRepeat('hourly');
        setAdv1('default');
        setAdv2('default');
        setContestEnable(false);
        setAutoMod(false);
        onClose();
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-400 bg-opacity-25 transition-opacity"></div>
            <div className="fixed inset-0 w-3/4 max-w-[700px] mx-auto overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-2 text-center sm:items-center sm:p-0 ">
                    <div role="createForm" className="relative transform w-full h-3/4 bg-white rounded-md text-left shadow-xl transition-all sm:my-8">
                        <div className="bg-white p-2 w-full rounded-md">
                            <p className="font-medium text-sm">Schedule this post</p>
                            <hr className="font-light my-2 text-gray-600 w-full" />
                            <div className="font-medium mb-2 text-sm">Submit Time</div>
                            <div className="flex flex-wrap justify-start gap-3">
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    customInput={<CustomInputDate />}
                                />
                                <DatePicker
                                    selected={startTime}
                                    onChange={time => setStartTime(time)}
                                    customInput={<CustomInputTime />}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                />
                                <div className="flex items-center gap-3">
                                    <label htmlFor="timeZone" className="font-medium text-sm">TimeZone:</label>
                                    <select id="timeZone" value={timeZone} onChange={e => setTimeZone(e.target.value)} className="w-72 text-sm p-1 border border-opacity-15 border-black">
                                        {timeZoneOptions.map(tz => (
                                            <option key={tz.value} value={tz.value}>
                                                {tz.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-5 mb-2 font-medium text-sm">Repeat Options</div>
                            <select id="reapeat" value={repeat} onChange={e => setRepeat(e.target.value)} className="w-56 text-sm p-1 border border-opacity-15 border-black">
                                {repeatOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-6 mb-2 font-medium text-sm">Advanced Options</div>
                            <div className="flex flex-1 justify-start gap-3">
                                <select id="advancedFirst" value={adv1} onChange={e => setAdv1(e.target.value)} className="w-56 text-sm p-1 border border-opacity-15 border-black">
                                    {advanced1Options.map(tz => (
                                        <option key={tz.value} value={tz.value}>
                                            {tz.label}
                                        </option>
                                    ))}
                                </select>
                                <select id="advancedSecond" value={adv2} onChange={e => setAdv2(e.target.value)} className="w-48 text-sm p-1 border border-opacity-15 border-black">
                                    {advanced2Options.map(tz => (
                                        <option key={tz.value} value={tz.value}>
                                            {tz.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <div className="mt-1 font-medium text-sm">Contest Mode</div>
                                <Switch id="contestEnable" checked={contestEnable} onChange={setContestEnable} className={`${contestEnable ? 'bg-blue-900' : 'bg-gray-300'} relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                                    <span aria-hidden="true" className={`${contestEnable ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                                </Switch>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <div className="mt-1 font-medium text-sm">Post as AutoModerator</div>
                                <Switch id="autoMod" checked={autoMod} onChange={setAutoMod} className={`${autoMod ? 'bg-blue-900' : 'bg-gray-300'} relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
                                    <span aria-hidden="true" className={`${autoMod ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} />
                                </Switch>
                            </div>

                            <div className="mt-10 mb-4 font-medium text-sm text-gray-400">Note: This post will be in Scheduled Posts in mod hub and editable.</div>
                            <div className="rounded-b-lg bg-gray-200 w-full h-16">
                                <div className="flex justify-end gap-3 p-3">
                                    <button onClick={() => handleCancel()} className="w-20 rounded-full p-2 h-10 border border-blue-600 hover:border-blue-800 text-blue-500 hover:text-blue-800 font-medium text-sm">cancel</button>
                                    <button onClick={() => handleClose()} className="w-20 rounded-full p-2 h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}