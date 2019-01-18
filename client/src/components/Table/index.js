import React from 'react';
import { MDBDataTable } from 'mdbreact';

function Table({ data }) {
    return (
        <MDBDataTable className="text-center"
            striped
            bordered
            hover
            data={data}
        />
    )
}

export default Table;