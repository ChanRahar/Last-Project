import React from 'react'

function Img({ width, height, src, alt, onClick, pt }) {
    return (
        <img className={`img-fluid ${pt}`}  style={{ width: width, height: height }} onClick={onClick} alt={alt} src= {src}  />
    )
}

export default Img;