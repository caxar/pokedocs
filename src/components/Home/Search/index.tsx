import React from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchSearchActions } from "../../../redux/search/asyncActions";
import { selectSearch } from "../../../redux/search/selectors";
import Product from "../../Products/Product";
import { nanoid } from "nanoid";
import {
  closeSearchPopup,
  setSearchPopup,
} from "../../../redux/search/searchSlice";

import "./Search.scss";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<any>();
  const { items, searchStatus, search } = useSelector(selectSearch);
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as Element;
      if (target.classList.contains("search-bg")) {
        dispatch(closeSearchPopup(false));
      }
    });
  }, []);

  React.useEffect(() => {
    searchPokemon(undefined);
  }, [searchValue]);

  const searchPokemon = async (search) => {
    dispatch(fetchSearchActions(search) as any);
  };

  const clearInputSearch = () => {
    setSearchValue("");
  };

  const closePopup = () => {
    dispatch(closeSearchPopup(false));
    setSearchValue("");
  };

  if (!items) return <></>;

  const itemsProduct = items?.map((item) => {
    return (
      <Product
        key={nanoid()}
        data={{
          id: item.id,
          name: item.name,
          types: item.types.map((i) => i.type.name),
        }}
      />
    );
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      searchPokemon(searchValue);
      dispatch(setSearchPopup(true));
    }
  };

  return (
    <div className="search">
      <div className="search-block">
        <input
          type="text"
          name="search"
          placeholder="Введите имя или id?"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue || ""}
          onKeyUp={handleKeyPress}
        />
        {searchValue && (
          <p onClick={() => clearInputSearch()} className={`clear`}>
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_429_11083)">
                <path
                  d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                  stroke="#292929"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_429_11083">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </p>
        )}
      </div>
      {search && (
        <div className="search-bg">
          <div className="search-content">
            <div className="content-title">Search Result:</div>
            {searchStatus === "pending" ? (
              <div className="details-loader">
                <img src="./assets/loader.png" alt="loader" />
              </div>
            ) : (
              <div className="content-result">
                {searchStatus == "failed" ? "Ошибка загрузки" : itemsProduct}
              </div>
            )}

            <div className="search-content_close" onClick={closePopup}>
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                  fill="#0F1729"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
