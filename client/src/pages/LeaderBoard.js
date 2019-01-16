import React, { Component } from 'react';
import { MDBDataTable, MDBContainer } from 'mdbreact';
import API from "../utils/API"

class DatatablePage extends Component {

    state = {
        data: {
            columns: [
                {
                    label: 'Ranking',
                    field: 'ranking',
                    sort: 'asc',
                    width: 10
                },
                {
                    label: 'Username',
                    field: 'username',
                    sort: 'asc',
                    width: 10
                },
                {
                    label: 'Wins',
                    field: 'wins',
                    sort: 'asc',
                    width: 10
                },
                {
                    label: 'Losses',
                    field: 'losses',
                    sort: 'asc',
                    width: 10
                },
            ],
            rows: [
            ]
        }
    }

    componentDidMount() {
        let userData = [];

        let ranking = 1;

        API.getAllUsers()
            .then(res => {
                console.log(res.data)
                res.data.forEach(user => {
                    // console.log(data.volumeInfo.imageLinks.smallThumbnail);
                    userData.push({
                        ranking: ranking,
                        username: user.username,
                        wins: user.wins,
                        losses: user.losses
                    })

                    ranking++
                })
                this.setState({ data: { ...this.state.data, rows: userData } });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <MDBContainer>
                <br />
                <h2 className="text-center">Leader Board</h2>
                <MDBDataTable className="text-center"
                    striped
                    bordered
                    hover
                    data={this.state.data}
                />
            </MDBContainer>
        );
    }
}

export default DatatablePage;