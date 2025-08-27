import { Link } from "react-router-dom";
import { addOneAnimal } from "../components/LastThreeAnimals.tsx";
import lastThreeAnoimals from "../components/LastThreeAnimals.tsx";
import { useState, useEffect } from "react";
import "../styles/home.scss";
import data from "../data/allAnimals.json";
import CardAnimal from "../components/CardAnimal.tsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import ButtonSeeAll from "../components/ButtonSeeAll.tsx";
import Image from '../images/main.png'

export default function home() {
  const [lasts, setLasts] = useLocalStorage("myLatest2", []);

  console.log(lasts);

  let historyAnimals1 = [];
  let j = 0;
  for (
    let i = lasts.length - 1;
    i > lasts.length - 1 - 3 && lasts.length > j;
    i--
  ) {
    historyAnimals1.push(data["all"][lasts[i]]);
    j++;
  }

  return (
    <div className="container">
      <img src={Image} className="mainImage" />
      <div className="content">
        <p className="title">Hello you!</p>
        <p className="title">Welcome to animals shelter</p>
        <p className="contentDescription">
          you are invite in to look at the animals or to adopt one
        </p>
        <div className="threeLastContainer">
          <p className="contentDescription">three lasts</p>
          <div className="threeLast">
            {historyAnimals1.length === 0 ? (
              <div>
                {" "}
               <div className="buttonSeeAll"> <ButtonSeeAll /></div>
                אין היסטוריה
              </div>
            ) : (
              <div className="rowLasts">
               <div className="buttonSeeAll"> <ButtonSeeAll /></div>

                {historyAnimals1.map((animal, index) => {
                  return (
                    <div key={index}>
                      <CardAnimal animal={animal}></CardAnimal>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
