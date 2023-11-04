import React, {useEffect, useState} from 'react';
import DetailedView from "./DetailedView"
import Input from "./ControlPanel/ControlPanel"
import OptionsSelect from "./OptionsSelect";
import Countries from "../../utils/Countries";
import axios from "axios";
import StakanType from "./ControlPanel/StakanType";

const orderBookSelectOptions = [
    {
        label: "Countries",
        options: [
            {
            id: 1,
            name: "dqwdqwdq"
            },
            {
                id: 2,
                name: "Ukraine"
            }
        ]
    },
    {
        label: "Cities",
        options: [
            {
                id: 1,
                name: "wjidqijwojiwq"
            },
            {
                id: 2,
                name: "Vinnytsia"
            }
        ]
    },

    {
        label: "Base",
        options: [
            {
                id: 1,
                name: "jiadfkladf"
            },
            {
                id: 2,
                name: "usd"
            }
        ]
    },
    {
        label: "Quote",
        options: [
            {
                id: 1,
                name: "jiadfkladf"
            },
            {
                id: 2,
                name: "uah"
            }
        ]
    }
]


export function TableWrapper() {
    const [selectedInput, setSelectedInput] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState()
    const [valuesToBuy, setValuesToBuy] = useState([]);
    const [valuesToSell, setValuesToSell] = useState([]);
    const [order, setOrder] = useState([]);

    async function fetchData(params) {
        try {
            let response = await axios.get(
                "http://43.207.112.193:8081/" +
                `obp?country=${params[0].value}&city=${params[1].value}&base=${params[2].value}&quote=${params[3].value}`
            );
            return response;
        } catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        if (selectedInput.length === 4) {
            fetchData(selectedInput).then(
                (r) => {
                    setValuesToBuy(r.data.obp.buy);
                    setValuesToSell(r.data.obp.sell);
                }
            )
        }
    }, [selectedInput]);
    //
    useEffect(() => {
        if (order.length) {
            let buyOrders = order.filter(item => item.type === "buy");
            buyOrders.sort((a, b) => b.price - a.price);
            const groupedBuyOrders = [];
            let currentBatch = [];
            let currentPrice = null;
            buyOrders.forEach(order => {
                if (order.price !== currentPrice) {
                    if (currentBatch.length) {
                        groupedBuyOrders.push(currentBatch);
                    }
                    currentBatch = [order];
                    currentPrice = order.price;
                } else {
                    currentBatch.push(order);
                }
            });
            if (currentBatch.length) {
                groupedBuyOrders.push(currentBatch);
            }

            let sellOrders = order.filter(item => item.type === "sell");
            sellOrders.sort((a, b) => a.price - b.price);

            const groupedSellOrders = [];
            currentBatch = [];
            currentPrice = null;
            sellOrders.forEach(order => {
                if (order.price !== currentPrice) {
                    if (currentBatch.length) {
                        groupedSellOrders.push(currentBatch);
                    }
                    currentBatch = [order];
                    currentPrice = order.price;
                } else {
                    currentBatch.push(order);
                }
            });
            if (currentBatch.length) {
                groupedSellOrders.push(currentBatch);
            }

            setValuesToBuy(groupedBuyOrders);
            setValuesToSell(groupedSellOrders);
        }

    }, [order]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (selectedInput.length === 4) {
                fetchData(selectedInput).then(
                    (r) => {
                        setValuesToBuy(r.data.obp.buy);
                        setValuesToSell(r.data.obp.sell);
                    }
                )
            }
        }, 30000);

        return () => clearInterval(intervalId);
    }, [selectedInput, fetchData]);

    const shouldDisable = (index) => {
        if (index === 0) return false;
        return selectedInput.length < index;
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:px-8 lg:px-16">
            <div className="flex justify-center  space-x-4 md:space-x-8 lg:space-x-12">
                {
                    <DetailedView selectedBatch={selectedBatch}/>
                }
                <StakanType buyValues={valuesToBuy} sellValues={valuesToSell} SetSelectedBatch={setSelectedBatch} />
                <Input order={order} setOrder={setOrder} selectedTickers={selectedInput}/>
            </div>
            <div className="flex mr-3">
                {orderBookSelectOptions.map((option, index) =>
                    <OptionsSelect
                        key={option.label}
                        label={option.label}
                        options={option.options}
                        setSelectedInput={setSelectedInput}
                        selectedInput={selectedInput}
                        disabled={shouldDisable(index)}
                    />
                )}
            </div>
        </div>
    );
}



export default function OrderBook() {
    return <TableWrapper/>;
}


