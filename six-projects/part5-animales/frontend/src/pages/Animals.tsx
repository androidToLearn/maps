import "../styles/pageAnimals.scss";
import data from "../data/allAnimals.json";
import CardAnimal from "../components/CardAnimal.tsx";
import { useEffect, useState } from "react";
import { Animal } from "../types/animal.types.ts";
import { afterFiltering } from "../utils/functionnsHelper.tsx";

export default function animals() {
  console.log("inside");
  console.log();

  let allAnimals = data["all"];
  let allRows1 = [];
  let allRows2 = [];
  let oneRow = [];
  let genderProperties = ["כל המגדרים", "זכר", "נקבה"];
  let ageProperties = [];
  ageProperties.push("כל הגילאים");
  for (let i = 1; i <= 200; i++) {
    if (i === 200) {
      ageProperties.push(i + "+");
    } else {
      ageProperties.push(i + "");
    }
  }

  let [myAgeSelect, setAgeSelect] = useState<string>(ageProperties[0]);
  let [myGenderSelect, setGenderSelect] = useState(genderProperties[0]);
  let [isGenderOpend, setIsGenderOpend] = useState(false);
  let [isAgeOpend, setIsAgeOpend] = useState(false);
  let [name, setName] = useState<string>("");

  allAnimals = afterFiltering(allAnimals, myAgeSelect, myGenderSelect, name);

  let i = 0;
  for (; i < allAnimals.length; i++) {
    if (i % 5 === 0 && i !== 0) {
      allRows1.push(oneRow);
      oneRow = [];
    }
    
    oneRow.push(allAnimals[i]);
  }
  allRows1.push(oneRow);

  i = 0;
  oneRow = []
  for (; i < allAnimals.length; i++) {
    if (i % 1 === 0 && i !== 0) {
      allRows2.push(oneRow);
      oneRow = [];
    }
    
    oneRow.push(allAnimals[i]);
  }
  allRows2.push(oneRow);

  return (
    <div className="containerAll">
      <div className="btnHomePageAnimals" onClick={()=>{
        window.location.href = '/'
      }}>בית</div>
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="inputName"
          autoComplete="text"
          id="text"
          name="text"
          onInput={() => {
            setName(document.getElementById("text")?.value);
          }}
        />
        <div
          className="selectGender"
          onClick={() => {
            setIsGenderOpend(true);
          }}
        >
          {myGenderSelect}
        </div>
        {isGenderOpend ? (
          <div className="scrollPropertiesGender">
            <div className="containGenders">
              <div className="containerOptions">
                {genderProperties.map((gender, index) => {
                  return (
                    <div>
                      <p
                        className="oneOption"
                        onClick={() => {
                          setGenderSelect(gender);
                          setIsGenderOpend(false);
                        }}
                      >
                        {gender}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="selectAge"
          id="selectAge"
          onClick={() => {
            setIsAgeOpend(true);
          }}
        >
          {myAgeSelect}
        </div>
        {isAgeOpend ? (
          <div className="scrollPropertiesAge">
            <div className="containAges">
              {ageProperties.map((age, index) => {
                return (
                  <div>
                    <p
                      className="oneOption"
                      onClick={() => {
                        setAgeSelect(age);
                        setIsAgeOpend(false);
                      }}
                    >
                      {age}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="btnSearch">
          <input type="image" name="submit" src="public/images/search.png" />
        </div>
      </form>
      <div className="notMediaQuery">{allRows1.length === 1 && allRows1[0].length === 0 ? (
        <div>
          <p className="noFoundP">לא נימצאו חיות לסינון זה</p>
        </div>
      ) : (
        <div className="containerScrolled">
          {allRows1.map((row, index) => {
            return (
              <div key={index} className="row">
                {row.map((animal, index) => {
                  return <CardAnimal animal={animal} key={index}></CardAnimal>;
                })}
              </div>
            );
          })}
        </div>
      )}</div>

      <div className="mediaQuery">{allRows2.length === 1 && allRows2[0].length === 0 ? (
        <div>
          <p className="noFoundP">לא נימצאו חיות לסינון זה</p>
        </div>
      ) : (
        <div className="containerScrolled">
          {allRows2.map((row, index) => {
            return (
              <div key={index} className="row">
                {row.map((animal, index) => {
                  return <CardAnimal animal={animal} key={index}></CardAnimal>;
                })}
              </div>
            );
          })}
        </div>
      )}</div>
    </div>
  );
}
