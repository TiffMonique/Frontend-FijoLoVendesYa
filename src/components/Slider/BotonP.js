import React, { useState, useEffect, useContext } from "react";
import { SubmitButton } from "./Boton";
import { usuarioContext } from '../../contexto';
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



