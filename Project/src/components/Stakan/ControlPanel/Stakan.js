import React from 'react';

export default function Stakan({ values, SetSelectedBatch, type }) {
    const emptyRows = Array.from({ length: Math.max(0, 11 - values.length) });

    const title = type === 'buy' ? 'Buy' : 'Sell';
    const titleColor = type === 'buy' ? 'text-green-700' : 'text-red-700';

    return (

<div className="px-4 sm:px-6 lg:px-8 inline-block">
    <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
            <h1 className={`text-base font-semibold text-center ${titleColor} leading-6 text-gray-900`}>{title}</h1>
        </div>
    </div>
    <div className="px-4 sm:px-6 lg:px-8 inline-block">
                    <table className="min-w-full border rounded-md border-gray-300  divide-y divide-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            <th
                                scope="col"
                                className="whitespace-nowrap relative px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                                Participants
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {values.map((value, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => {
                                    SetSelectedBatch(value)
                                }} className="cursor-pointer">
                                    <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500">
                                        {value.price}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        {value.volume}
                                    </td>

                                </tr>
                            </React.Fragment>
                        ))}

                        {emptyRows.map((_, id) => (
                            <tr key={id + values.length}>
                                <td className="whitespace-nowrap py-4 px-6 text-sm text-gray-500">&nbsp;</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">&nbsp;</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">&nbsp;</td>
                            </tr>
                        ))}


                        </tbody>
                    </table>
                </div>
             </div>
);
}
