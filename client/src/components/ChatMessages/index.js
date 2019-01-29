import React from "react";
import "./style.css";

const NameInput = React.forwardRef(({ chat, children }, ref) => (
    <div id="chat" className="justify-content-center my-1">
        <div id="chat-messages" ref={ref}>
            {chat.map(line => (
                <p className={'line-chat player' + line.idNum} key={line.keyId}><span>{line.name}</span>: {line.message}</p>
            ))}
        </div>
        {children}
    </div>
));


export default NameInput;