import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import ContextUser from "../../context/UserContext";
export async function calificar(calificacion, user) {
  if (user.logged) {
    const location = window.location.href.split("/");
    const id = location[location.length - 1];
    console.log(id);
    console.log(calificacion);
    await axios
      .post(
        "http://localhost:4000/api/tienda/calificar",
        {
          idVenta: id,
          calificacion: calificacion,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("hola" + response);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('No está logeado')
  }
}
const Rate = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const user = useContext(ContextUser);
  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(
    (props) => {
      
      return Array(count)
        .fill(0)
        .map((_, i) => i + 1)
        .map((idx) => (
          <FaStar
            key={idx}
            size={24}
            className="cursor-pointer"
            icon={"fa-regular fa-star"}
            onClick={() => {
              onRating(idx);
              calificar(idx, user);
            }}
            style={{ color: getColor(idx) }}
            onMouseEnter={() => setHoverRating(idx)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ));
    },
    [count, rating, hoverRating]
  );

  return <div>{starRating}</div>;
};

Rate.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC",
  },
};

export default Rate;
