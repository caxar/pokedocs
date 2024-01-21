import React from "react";
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./DetailsProducts.scss";
import "react-tabs/style/react-tabs.css";
import LoadImg from "../LoadImg";
import { useDispatch, useSelector } from "react-redux";
import { selectDopeInfo } from "../../../redux/dopeinfo/selectors";
import { setOpenInfoTest } from "../../../redux/dopeinfo/dopeinfoSlice";
import { fetchDopeInfoAction } from "../../../redux/dopeinfo/asyncAction";
import SkeletonLoader from "./SkeletonLoader";
import ProgressBar from "../ProgressBar";
import { closeSearchPopup } from "../../../redux/search/searchSlice";
// import { fetchDopeInfoAction } from "../../../redux/dopeinfo/asyncAction";

type Props = {
  showPopup: boolean;
  setShowPopup: (i: boolean) => void;
  cardId: any;
  // data: {
  //   name: string;
  //   id: null;
  //   evolution;
  //   dopeInfo;
  // };
};

const DetailsProducts: React.FC<Props> = ({
  cardId,
  setShowPopup,
  showPopup,
}) => {
  const [pokemonData, setPokemonData] = React.useState(null);
  const [openPopup, setOpenPopup] = React.useState(null);
  const { status, entities } = useSelector(selectDopeInfo);

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as Element;
      if (target.classList.contains("details-bg")) {
        setShowPopup(false);
      }
    });
  }, []);

  React.useEffect(() => {
    fetchfa();
  }, [cardId]);

  const fetchfa = async () => {
    dispatch(fetchDopeInfoAction(cardId) as any);

    // const response = await axios.get(
    //   `https://pokeapi.co/api/v2/pokemon/${cardId}`
    // );
    // const data = response.data;

    // const speciesResponse = await axios.get(data.species.url);
    // const speciesData = speciesResponse.data;
    // const evolutionChainResponse = await axios.get(
    //   speciesData.evolution_chain.url
    // );
    // const evolutionChainData = evolutionChainResponse.data;

    // const getEvolutionData = async (evolutionChain) => {
    //   let evolutionData = [];
    //   let currentPokemon = evolutionChain.species.name;
    //   let evolvesTo = evolutionChain.evolves_to;
    //   while (evolvesTo.length > 0) {
    //     let nextPokemon = evolvesTo[0].species.name;
    //     const response = await axios.get(
    //       `https://pokeapi.co/api/v2/pokemon/${nextPokemon}`
    //     );
    //     const data = response.data;
    //     evolutionData.push({
    //       name: data.name,
    //       id: data.id,
    //     });
    //     evolvesTo = evolvesTo[0].evolves_to;
    //   }
    //   return evolutionData;
    // };

    // const evolutionData = await getEvolutionData(evolutionChainData.chain);

    // setPokemonData({
    //   name: data.name,
    //   id: data.id,
    //   evolution: evolutionData,
    //   dopeInfo: { ...data },
    // });
  };

  const closePopup = () => {
    setShowPopup(!showPopup);
    dispatch(closeSearchPopup(false));
  };

  if (!entities) return <></>;

  const getDopeInfo = entities[0]?.dopeInfo;
  const popupTypes = getDopeInfo?.types[0]?.type?.name;

  let count = 1;

  return (
    <div className="details-bg">
      <div
        className={`details-content ${
          status === "pending" ? "pokeloader" : ""
        }`}
      >
        {status == "pending" ? (
          <div className="details-loader">
            {/* <SkeletonLoader /> */}
            <img src="./assets/loader.png" alt="loader" />
          </div>
        ) : (
          <>
            <div className={`details-content_top ${popupTypes}`}>
              <LoadImg id={`${entities[0]?.id}`} />
              <div className="top-text">
                <div className="top-text_title">{entities[0]?.name}</div>
                <p className="top-text_subtitle">
                  #{String(entities[0]?.id).padStart(3, "0")}
                </p>
                <div className="top-text_types">
                  {getDopeInfo?.types?.map((item) => (
                    <div className={`type ${item.type.name}`}>
                      <img
                        src={`./assets/${item.type.name}.svg`}
                        alt={`${item?.type?.name}`}
                      />
                      <span>{item?.type?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="details-content_close" onClick={closePopup}>
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
            <div className="details-content_bottom">
              <div className="details-tabs">
                <Tabs>
                  <TabList>
                    <Tab>About</Tab>
                    <Tab>Stats</Tab>
                    <Tab>Evolution</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="tab-panel_item">
                      <div className={`panel-item_title ${popupTypes}`}>
                        Pokedocs Data
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <td className="cat-name">Height:</td>
                            <td className="cat-stats">
                              {getDopeInfo?.height / 10}m
                            </td>
                          </tr>
                          <tr>
                            <td className="cat-name">Weight:</td>
                            <td className="cat-stats">
                              {getDopeInfo?.weight / 10}kg
                            </td>
                          </tr>
                          <tr>
                            <td className="cat-name">Abilities:</td>
                            <td className="cat-stats">
                              <div className="item-ability">
                                <div className="item-ability_block">
                                  {getDopeInfo?.abilities?.map((item) => (
                                    <p>
                                      {count++}. {item?.ability?.name}
                                      {item?.is_hidden
                                        ? " (hidden ability)"
                                        : ""}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="cat-name">Types:</td>
                            <td className="cat-stats">
                              <div className="item-types">
                                {getDopeInfo?.types.map((item) => (
                                  <div className={`type ${item?.type?.name}`}>
                                    <img
                                      src={`./assets/${item?.type?.name}.svg`}
                                      alt={`${item?.type?.name}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="tab-panel_item">
                      <div className={`panel-item_title ${popupTypes}`}>
                        Base Stats
                      </div>
                      <table>
                        <tbody>
                          {getDopeInfo?.stats?.map((item) => (
                            <tr>
                              <td className="cat-name">{item?.stat?.name}:</td>
                              <td className="cat-stats">{item?.base_stat}</td>
                              <td>
                                <ProgressBar
                                  bgcolor={popupTypes}
                                  completed={item?.base_stat}
                                />
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td className="cat-name">Total:</td>
                            <td className="cat-stats">
                              {getDopeInfo?.stats.reduce((acc, item) => {
                                return acc + item?.base_stat;
                              }, 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="evolution">
                      <div className="evolution-title">
                        {Object.keys(entities[0]?.evolution).length === 0
                          ? "This Pokemon doesn't Evolution"
                          : ""}
                      </div>
                      <div className="evolution-block">
                        {entities[0]?.evolution?.map((evolution) => (
                          <div className="evolution-item" key={evolution?.id}>
                            <div className="evolution-item_img">
                              <div className="item-img_bg"></div>
                              <LoadImg id={`${evolution?.id}`} />
                            </div>
                            <div className="evolution-item_text">
                              <div className="title">{evolution?.name}</div>
                              <p className="subtitle">
                                #{String(evolution?.id).padStart(3, "0")}
                              </p>
                            </div>
                          </div>
                        ))}
                        {/* <div className="arrow"></div> */}
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsProducts;
