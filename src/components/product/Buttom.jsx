import React, { useState, useEffect, useContext } from "react";
import { SubmitButton } from "../accountBox/common/SubmitButton";

export const FancyButton = (props) => {
  const initialState = "Agregar a lista de deseos";
  const [buttonText, setButtonText] = useState("Agregar a lista de deseos");
  // the effect
  /*useEffect(() => {
        if (buttonText !== initialState) {
            setButtonText("Suscribirse")
        } 
    }, [buttonText])*/
  const changeText = (text) => {
    console.log("cambiar texto", props.suscrito);

    if (props.suscrito) {
      setButtonText("Quitar de lista de deseos");
      props.setSuscripcion(false, props.nombre);
    } else {
      setButtonText("Agregar a lista de deseos");
      props.setSuscripcion(true, props.nombre);
    }
  };

  return (
    <SubmitButton type="submit" onClick={changeText}>
      {props.suscrito ? "Cancelar Suscripcion" : "Suscribirse"}
    </SubmitButton>
  );
};
