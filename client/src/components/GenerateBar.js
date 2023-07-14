import React from "react"
import { Link } from "react-router-dom"

const GenerateBar = ({setLocation}) => {

    const genClickHandler = () => {

    };

    return (
        <div>
            <Link to="/Home" className="generateBarRight" onClick={()=>{setLocation(1)}}>
                GENERATE
            </Link>
        </div>
    )
}

export default GenerateBar