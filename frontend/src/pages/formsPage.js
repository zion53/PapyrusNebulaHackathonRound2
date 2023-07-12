import React from "react";
import MyForm from "../components/form/form";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/navbar";


const FormPage = ()=>{
    const { state } = useLocation();
    console.log(state);
    return(
        <div>
            <Navbar />
            <MyForm templateId={state}/>
        </div>
    );


}

export default FormPage;