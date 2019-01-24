import React from 'react'
import { MDBCardHeader } from 'mdbreact';

function Header({children}) {
    return (
        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
            <div />
            <h2 className="white-text text-center mx-3">{children}</h2>
            <div />
        </MDBCardHeader>
    )
}

export default Header;