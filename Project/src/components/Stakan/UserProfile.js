import React, { useState, useRef  } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'


export default function UserProfile() {
    const [editUsername, setEditUsername] = useState(false);
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef();

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onButtonClick = () => {
        fileInputRef.current.click();
    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-white py-2">
            <div className="relative max-w-md w-full border rounded-md p-3 border-gray-300 space-y-8">

                <header className="absolute top-0 left-1 p-2">
                    <div className="text-center font-medium text-gray-900">Profile</div>
                </header>

                <div>
                    <div className="flex flex-col border-b border-gray-300 items-center gap-y-3">
                        <div className="h-32 w-32 text-gray-300 relative">
                            <UserCircleIcon className={`absolute inset-0 ${selectedFile ? 'hidden' : ''}`} aria-hidden="true" />
                            {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Profile" className="rounded-full w-full h-full object-cover" />}
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onFileChange}
                            className="hidden"
                            accept="image/png, image/jpeg"
                        />

                        <button type="button"
                                onClick={onButtonClick}
                                className="rounded-md bg-white px-2.5 mb-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Change
                        </button>

                    </div>
                </div>


                <div className="flex items-center space-x-1">
                    <h3 className="text-left font-medium text-gray-900">User name:</h3>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-2 block w-fit px-1  border-b  text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md mb-2"
                        disabled={!editUsername}
                    />
                    <button
                        onClick={() => setEditUsername(!editUsername)}
                        type="button"
                        className="rounded-md bg-white px-2.5 text-md font-semibold text-indigo-600 "
                    >
                        {editUsername ? 'Save' : 'Edit'}
                    </button>
                </div>

                <div>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <h3 className="text-left mb-3 font-medium text-gray-900">Change Password</h3>
                    </div>

                    <div>
                        <label htmlFor="current-password" className="sr-only">Current Password</label>
                        <input id="current-password"
                               name="current-password"
                               type="password"
                               autoComplete="current-password"
                               required
                               className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="new-password" className="sr-only">New Password</label>
                        <input id="new-password"
                               name="new-password"
                               type="password"
                               autoComplete="new-password"
                               required
                               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                </div>

                    <div className="mt-2  text-center">
                <button type="button" className={`rounded-md  px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-inset focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${currentPassword && newPassword ? 'bg-indigo-500 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 ring-gray-400 cursor-not-allowed'}`} disabled={!(currentPassword && newPassword)}>
                    Save
                </button>
                    </div>

                    </div>
                </div>
            </div>
    )
}
