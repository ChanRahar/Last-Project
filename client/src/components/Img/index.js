import React from 'react'

function Img({ width, height, src, alt, onClick }) {
    return (
        <img className="img-fluid" style={{ width: width, height: height }} onClick={onClick} alt={alt} src= {src}  />
    )
}

export default Img;