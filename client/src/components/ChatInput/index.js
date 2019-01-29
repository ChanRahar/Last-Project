import React from "react";


const NameInput = React.forwardRef(({ onSubmit }, ref) => (
    <div id="chat-bar">
        <form onSubmit={onSubmit}>
            <input id="chat-input"
                name="message"
                ref={ref}
                type="input" />
            <button id="chat-send" type="submit">Send</button>
        </form >
    </div>
));

export default NameInput;