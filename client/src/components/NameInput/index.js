import React from "react";
import { MDBBtn} from 'mdbreact';

const NameInput = React.forwardRef(({loggedIn, onSubmit}, ref) => (
    <form onSubmit={onSubmit}>

        <input className={loggedIn === true ? "invisible" : "visible text-center"}
            id="username"
            name="username"
            ref={ref}
            type="input"
            placeholder="Enter Name"
        />
        <div className="text-center">
            <MDBBtn color="unique" type="submit">Start</MDBBtn>
        </div>

    </form>
));


export default NameInput;