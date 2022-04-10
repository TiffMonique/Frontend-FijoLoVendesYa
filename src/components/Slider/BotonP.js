import React, { useState, useEffect, useContext } from "react";
import { SubmitButton } from "./Boton";
import { usuarioContext } from '../../contexto';
export const FancyButton = (props) => {

   const initialState = "Suscribirse";
    const [buttonText, setButtonText] = useState("Suscribirse");
    // the effect
    /*useEffect(() => {
        if (buttonText !== initialState) {
            setButtonText("Suscribirse")
        } 
    }, [buttonText])*/
    const changeText = (text) => {
        console.log("cambiar texto", props.suscrito);

        if(props.suscrito) {
            setButtonText("Cancelar Suscripcion");
            props.setSuscripcion(false, props.nombre);
        } else {
            setButtonText("Suscribirse");
            props.setSuscripcion(true, props.nombre);
        }
    };

    return (
        <SubmitButton type="submit" onClick={changeText} >{props.suscrito ? "Cancelar Suscripcion" : "Suscribirse"}</SubmitButton>
       
    )



};



