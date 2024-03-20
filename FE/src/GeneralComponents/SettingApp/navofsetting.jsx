import React from "react";

export default function Navofsetting() {
  return (
    <div>
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-md">Save</button>
        </div>
        <div className="flex mt-4">
        <div className="w-1/4">
            <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">Profile</h1>
                <p className="text-sm text-gray-400">Change your profile settings</p>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">Security</h1>
                <p className="text-sm text-gray-400">Change your password</p>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">Billing</h1>
                <p className="text-sm text-gray-400">Manage your billing information</p>
            </div>
            </div>
        </div>
        <div className="w-3/4">
            <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">Profile</h1>
                <p className="text-sm text-gray-400">Change your profile settings</p>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">Security</h1>
                <p className="text-sm text-gray-400">Change your password</p>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">Billing</h1>
                <p className="text-sm text-gray-400">Manage your billing information</p>
            </div>
            </div>
        </div>
        </div>
    </div>
    )};