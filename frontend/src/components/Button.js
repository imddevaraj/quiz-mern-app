import React, { Children }  from "react";

const Button = ({onClick, children, className=''}) => {
    <button className ={ `btn ${className}`} onClick={onClick}>
        <children>
    </button>
}