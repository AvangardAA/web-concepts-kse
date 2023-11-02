import {Fragment, useState} from 'react'
import axios from "axios";

export default function Input({order, setOrder, orderTickers}) {
    const [price, setPrice] = useState('');
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (price && amount && type) {
            setOrder([...order, {price: `$${price}`, volume: `${amount}`, comment, type: type}]);
            setPrice('');
            setAmount('');
            setComment('');
            setType('')

            await axios.post(`http://43.207.112.193:8081/post-order`, null,
                { headers: { "Content-Type": "application/x-www-form-urlencoded"},params:{
                        country: 'Ukraine',
                        city: "Vinnytsia",
                        base: "usd",
                        quote: "uah",
                        order_type: type,
                        price: price,
                        volume: amount,
                        note: comment,
                        user_id: "651050a03aabe6ca4827334c",
                    }}
            )
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    alert(error);
                });
        }

        console.log(orderTickers)
    };


    const [selectedRow, setSelectedRow] = useState(null);

    return (

        <div className=" border p-3 rounded-md border-gray-300">
            <div>
                <div>
                    <div className="hidden sm:block">
                        <div className="w-full border-gray-200">
                            <nav className=" flex justify-center " aria-label="Tabs">
                                    <span className="flex items-center">
                                <a
                                    onClick={
                                        () => {
                                            setType("buy")
                                        }
                                    }
                                    className={
                                    type === "buy" ?
                                        "border-transparent text-green-700 hover:text-green-700 w-auto border-b-2 py-4 px-1 text-center text-base font-bold"
                                        :
                                        "border-transparent text-gray-500 hover:text-green-700 w-auto border-b-2 py-4 px-1 text-center text-base font-bold"
                                }
                                >
                                    Buy
                                </a>

                                <a
                                    onClick={
                                        () => {
                                            setType("sell")
                                        }
                                    }
                                    className={
                                        type === "sell" ?
                                            "border-transparent text-red-700 hover:text-red-700 w-auto border-b-2 py-4 px-1 text-center text-base font-bold"
                                            :
                                            "border-transparent text-gray-500 hover:text-red-700 w-auto border-b-2 py-4 px-1 text-center text-base font-bold"
                                    }
                                >
                                    Sell
                                </a>

                            </span>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium  text-gray-900">
                    Price
                </label>
                <div className="relative  mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                        aria-describedby="price-currency"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            USD
          </span>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        Amount
                    </label>
                    <div className="relative  mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm"></span>
                        </div>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                    </div>
                    <div>

                    </div>
                </div>

                <form action="ControlPanel#" className="relative" onSubmit={handleSubmit}>
                    <div
                        className="overflow-hidden w-full  mt-5 rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                        <label htmlFor="description" className=" sr-only">
                            Description
                        </label>
                        <textarea

                            name="note"
                            id="note"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            className="block min-w-full p-2 resize-none border-b border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Write a description..."
                            rows={4}
                        />

                        <div aria-hidden="true">
                            <div className="">
                                <div className=""/>
                            </div>
                            <div className="h-px"/>
                            <div className="">
                                <div className="py-px">
                                    <div className="h-1"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center ">
                            <button
                                type="submit"
                                className="inline-flex mb-2 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <div className="flex flex-col items-center mt-1 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:justify-items-center">
                        <h1 className="text-sm mt-3 mb-2 font-semibold leading-6 text-gray-900">Active orders</h1>
                    </div>
                    <div className="sm:flex-auto">
                        <div className="sm:ml-16">
                        </div>
                    </div>
                    <div className=" w-full">
                        <div className=" sm:-mx-6 lg:-mx-8">
                            <div className="flex pt-0  align-middle overflow-y-auto" style={{ maxHeight: '256px' }}>
                                <table className= "min-w-full border-separate border-spacing-0">
                                    <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 min-w-full border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-2 text-start text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="sticky top-0 z-10 min-w-full hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                        >
                                            Amount
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 ">
                                    {order.map((order, index) => (
                                        <Fragment key={index}>
                                            <tr onClick={() => setSelectedRow(selectedRow === index ? null : index)}>
                                                <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500 border-b border-gray-300">
                                                    {order.price}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-1 text-right text-sm text-gray-500 border-b border-gray-300">
                                                    {order.volume}
                                                </td>
                                            </tr>
                                            {selectedRow === index && (
                                            <tr>
                                                <td colSpan="100%">
                                                <textarea
                                                 readOnly
                                                 value={order.comment}
                                                 className="w-full h-20 max-h-80 p-2 resize-none border-b border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm"
                                                 rows={4}
                                                  />
                                                </td>
                                            </tr>
                                            )}
                                        </Fragment>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
