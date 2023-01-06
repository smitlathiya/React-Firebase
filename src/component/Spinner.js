import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import './Spinner.css'

const Spinner = props => {
    return (
        <div className="loader-backdrop">
            <ScaleLoader color='#4e73df' loading={true} size={150} />
        </div>
    );
}

export default Spinner;
