
import { Animal } from "../types/animal.types";
export function afterFiltering(
  allAnimals: Animal[],
  myAgeSelect: string,
  myGenderSelect: number | string,
  name: string
) {
  let allAnimalsAfterFiltering = [];
  let isGood = true;
  for (let i = 0; i < allAnimals.length; i++) {
    isGood = true;
    if (myGenderSelect === "כל המגדרים") {
    } else if (allAnimals[i]["gender"] !== myGenderSelect) {
      isGood = false;
    }

    if (myAgeSelect === "כל הגילאים") {
    } else if (
      myAgeSelect === "200+" &&
      new Date(Date.now()).getFullYear() - allAnimals[i]["birthYear"] < 200
    ) {
      isGood = false;
    } else if (
      parseInt(myAgeSelect) !==
      new Date(Date.now()).getFullYear() - allAnimals[i]["birthYear"]
    ) {
      isGood = false;
    }

    if (name !== "" && !allAnimals[i]["firstName"].includes(name)) {
      isGood = false;
    }

    if (isGood) {
      allAnimalsAfterFiltering.push(allAnimals[i]);
    }
  }
  return allAnimalsAfterFiltering;
}
export function getAnimalById(data: Animal[], id: string|undefined) {
  for (let i = 0; i < data.length; i++) {
    if (data[i]["id"] === id) {
      return data[i];
    }
  }
  return null;
}