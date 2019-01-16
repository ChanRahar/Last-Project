import React, { Component } from 'react';
import { MDBDataTable, MDBContainer } from 'mdbreact';

const data = {
    columns: [
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Position',
            field: 'position',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Office',
            field: 'office',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Age',
            field: 'age',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Start date',
            field: 'date',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Salary',
            field: 'salary',
            sort: 'asc',
            width: 100
        }
    ],
    rows: [
        {
            name: 'Tiger Nixon',
            position: 'System Architect',
            office: 'Edinburgh',
            age: '61',
            date: '2011/04/25',
            salary: '$320'
        },
        {
            name: 'Garrett Winters',
            position: 'Accountant',
            office: 'Tokyo',
            age: '63',
            date: '2011/07/25',
            salary: '$170'
        },
        {
            name: 'Donna Snider',
            position: 'Customer Support',
            office: 'New York',
            age: '27',
            date: '2011/01/25',
            salary: '$112'
        }
    ]
};

class DatatablePage extends Component {

    componentDidMount() {}
   
    render() {
        return (
            <MDBContainer>
                <br />
                <h2 className="text-center">Leader Board</h2>
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={data}
                />
            </MDBContainer>
        );
    }
}

export default DatatablePage;