import { useState, Fragment } from 'react';

export default function DetailedView({ selectedBatch }) {
    const [displayComment, setDisplayComment] = useState(false);


    return (
        <div className="border rounded-md border-gray-300 sm:px-6 lg:px-8">
            <div className="sm:flex sm:justify-items-start">
                <h1 className="text-base mt-3 mb-2 font-semibold leading-6 text-gray-900">Selected price: {selectedBatch?.price}</h1>
            </div>
            <div className="flex">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block lg:w-64 pt-0 sm:min-w-full align-middle overflow-y-auto" style={{ maxHeight: '600px' }}>
                        <table className= "h-full border-separate border-spacing-0 ">
                            <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 w-full border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-2 text-start text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 w-full hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                >
                                    Volume
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedBatch &&
                                <Fragment>

                                    <tr onClick={() => {setDisplayComment(!displayComment)}}>
                                        <td className="border-b border-gray-300 whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">

                                        </td>
                                        <td className="border-b border-gray-300 whitespace-nowrap text-center px-3 py-4  text-sm text-gray-500">
                                            {selectedBatch.volume}
                                        </td>
                                    </tr>

                                        {displayComment &&
                                            <tr>
                                                <td colSpan="2">
                                                <textarea
                                                    readOnly
                                                    value={displayComment.comment}
                                                    className=" w-full border-b resize-none border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
                                                    rows={4}
                                                />
                                            </td>
                                            </tr>
                                        }

                                </Fragment>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
