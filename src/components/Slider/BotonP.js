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
    var context = parseInt(useContext(usuarioContext)) ;
    const changeText = (text) => {
        console.log("cambiar texto");
        context ++; 
        usuarioContext = React.createContext(context);
        console.log(context);
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



