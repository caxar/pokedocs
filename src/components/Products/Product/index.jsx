import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import LoadImg from "../../Home/LoadImg";

import "./Product.scss";
import DetailsProducts from "../../Home/DetailsProducts";

const Product = ({ data }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [cardId, setCardId] = React.useState(null);

  const dispatch = useDispatch();

  const handleCardClick = (id) => {
    setShowPopup(true);
    setCardId(id);
  };

  const { id, name, types } = data;
  const cardTypeColor = types[0];

  return (
    <>
      <div
        className={`product-card ${cardTypeColor}`}
        onClick={() => handleCardClick(id)}
      >
        <div className="product-card_text">
          <div className="text_id">#{String(id).padStart(3, "0")}</div>
          <div className="text_name">{name}</div>
          <div className="text_types">
            {types.map((item) => (
              <div className={`type ${item}`}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="product-card_bg"></div>
        <div className="product-card_image">
          <LoadImg id={id} />
        </div>
      </div>
      {showPopup && (
        <DetailsProducts
          cardId={cardId}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
    </>
  );
};

export default Product;
