import React from 'react';
import Stakan from "./Stakan";

export default function StakanType({ buyValues, sellValues, SetSelectedBatch }) {
    return (
        <div className="flex">
            <Stakan values={buyValues} SetSelectedBatch={SetSelectedBatch} type="buy" />
            <Stakan values={sellValues} SetSelectedBatch={SetSelectedBatch} type="sell" />
        </div>
    );
}