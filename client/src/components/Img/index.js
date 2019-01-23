import React from 'react'

function Img({ width, height, src, alt }) {
    return (
        <img className="img-fluid" style={{ width: width, height: height }} alt={alt} src= {src}  />
    )
}

export default Img;