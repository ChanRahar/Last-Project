import React from 'react'

function Img({ width, height, src }) {
    return (
        <img className="img-fluid" style={{ width: width, height: height }} src= {src}  />
    )
}

export default Img;