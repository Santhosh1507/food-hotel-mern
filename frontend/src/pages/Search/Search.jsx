import React, { useContext, useState } from "react";
import "./Search.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, addToCart, removeFromCart, url, food_list } = useContext(StoreContext);

  const filteredFoodList = food_list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search">
      <div className="search-items">
        <input
          id="searchInput"
          type="text"
          placeholder="Search for restaurants and food"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img src={assets.search_icon} alt="Search Icon" />
      </div>
      <br />
      <hr />
      <div className="search-results">
        {filteredFoodList.map((item) => (
          <div key={item._id} className="food-item">
            <div className="food-item-img-container">
              <img className="food-item-image" src={`${url}/images/${item.image}`} alt={item.name} />
              {!cartItems[item._id] ? (
                <img
                  className="add"
                  onClick={() => addToCart(item._id)}
                  src={assets.add_icon_white}
                  alt="Add to cart"
                />
              ) : (
                <div className="food-item-counter">
                  <img
                    onClick={() => removeFromCart(item._id)}
                    src={assets.remove_icon_red}
                    alt="Remove from cart"
                  />
                  <p className="para-food-list">{cartItems[item._id]}</p>
                  <img
                    onClick={() => addToCart(item._id)}
                    src={assets.add_icon_green}
                    alt="Add more to cart"
                  />
                </div>
              )}
            </div>
            <div className="food-item-info">
              <div className="food-item-name-rating">
                <p>{item.name}</p>
                <img src={assets.rating_starts} alt="Rating stars" />
              </div>
              <p className="food-item-desc">{item.description}</p>
              <p className="food-item-price">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
