import React, { useState, useEffect } from "react";
import { SubmitButton } from "./Boton";

export const FancyButton = () => {

   const initialState = "Suscribirse";
    const [buttonText, setButtonText] = useState("Suscribirse");
    

    // the effect
    /*useEffect(() => {
        if (buttonText !== initialState) {
            setButtonText("Suscribirse")
        } 
    }, [buttonText])*/

    const changeText = (text) => {
        console.log("cambiar texto");
        if(buttonText == initialState) {
            setButtonText("Cancelar Suscripcion")
        } else {
            setButtonText("Suscribirse")
        }
    };

    return (
        <SubmitButton type="submit" onClick={changeText} >{buttonText}</SubmitButton>
       
    )



};



