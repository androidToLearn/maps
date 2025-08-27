import "../styles/animal.scss";
import { useLocalStorage } from "@uidotdev/usehooks";
import data from "../data/allAnimals.json";
import { Animal } from "../types/animal.types";

export function findAnimalIndexById(data: Animal[], id: string) {
  for (let i = 0; i < data.length; i++) {
    if (data[i]["id"] === id) {
      return i;
    }
  }
  return null;
}
interface cardAnimalProps {
  animal: Animal;
}

export default function cardAnimal({ animal }: cardAnimalProps) {
  const [latest, setLatest] = useLocalStorage<(number | null)[]>(
    "myLatest2",
    []
  );

  return (
    <div>
      <div
        className="cardContainer"
        onClick={() => {
          latest.push(findAnimalIndexById(data['all'], animal.id));
          setLatest(latest);
          console.log(latest);
          
          window.location.href = `/description/${animal.id}`;
        }}
      >
        <img src={animal["pictureUrl"]} className="picture"></img>
        <p className="name">{animal["firstName"]}</p>
        <div className="rowPropertyFirst">
          <label htmlFor={"age"} className="label">
            :age
          </label>
          <p>
            {new Date(Date.now()).getFullYear() - animal.birthYear}
          </p>
        </div>
        <div className="rowProperty">
          <label htmlFor={"gender"} className="label">
            :gender
          </label>
          <p>{animal["gender"]}</p>
        </div>

        <div className="lastProperty">
          <label htmlFor={"type"} className="label">
            :type
          </label>
          <p>{animal["animalType"]}</p>
        </div>
      </div>
    </div>
  );
}
