import {Link, useNavigate} from "react-router-dom";
import JSZip from "jszip";
import {useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {CheckCircleIcon} from "@heroicons/react/20/solid";
import {RadioGroup} from "@headlessui/react";


const frequencies = [
    {value: 'Provider'},
    {value: 'Client'},
]
export default function LogIn() {
    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [file, setFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(!!localStorage.getItem("private.pem"))
    const [errorMessage, setErrorMessage] = useState("")
    const [frequency, setFrequency] = useState(frequencies[0])
    const [section, setSection] = useState('Provider')
    const inputRef = useRef(null);

    const data = {
        username: userEmail,
        hashed_password: userPassword,
    }
    const {logIn} = useAuth()

    const submitSignIn = async (e) => {
        e.preventDefault()

        let zip = new JSZip()
        zip.loadAsync(file).then(
            function (contents) {
                contents.forEach(
                    function (relativePath, zipEntry) {
                        if (!zipEntry.dir) {
                            zipEntry.async('string').then(function (fileContents) {
                                console.log(fileContents)
                                localStorage.setItem(relativePath, fileContents)
                            })
                        }
                    })
            })
        if (section === "Provider" & !file) {
            setErrorMessage("Upload file with valid keys")
        } else {
            try {
                await logIn(data)
                navigate("/")
            } catch (error) {
                if (error.response.status === 404 || error.response.status === 404) {
                    setErrorMessage("Invalid login credentials")
                }
            }
        }
    };

    const handleClick = () => {

        inputRef.current.click();
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setIsFileUploaded(true)
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    console.log(section)

    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-1 lg:px-20 my-40">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your
                        account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                    </p>
                </div>

                <RadioGroup
                    value={frequency}
                    onChange={setFrequency}
                    className="mx-auto flex mt-10"
                >
                    {frequencies.map((option) => (
                        <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({checked}) =>
                                classNames(
                                    checked ? 'bg-blue-900 text-white' : 'text-gray-500',
                                    'cursor-pointer rounded-full px-2.5 py-1'
                                )
                            }
                        >
                            <span onClick={() => setSection(option.value)}>{option.value}</span>
                        </RadioGroup.Option>
                    ))}
                </RadioGroup>

                {!!errorMessage.length &&
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-red-600">
                            {errorMessage}
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>
                }
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={submitSignIn}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address (username)
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        value={userEmail}
                                        onChange={(e) => {
                                            setUserEmail(e.target.value)
                                        }}
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        value={userPassword}
                                        onChange={(e) => {
                                            setUserPassword(e.target.value)
                                        }}
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {section === 'Provider' &&

                            <div>
                                <input
                                    style={{display: 'none'}}
                                    ref={inputRef}
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className="inline-flex items-center gap-x-2 rounded-md bg-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {isFileUploaded &&
                                        <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
                                    }
                                    Upload file
                                </button>
                            </div>
                            }


                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link to="/registration/" className="font-medium text-blue-900 hover:text-blue-800">
                                        Don't have account?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
