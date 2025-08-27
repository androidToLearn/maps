import "../styles/pageDescription.scss";
import { useParams } from "react-router-dom";
import data from "../data/allAnimals.json";
import { getAnimalById } from "../utils/functionnsHelper";
import Home from "./Home";


export default function description() {

  let id = useParams<string>();
  console.log(id["id"]);
  

  let animal =   getAnimalById(data['all'], id["id"]);

  if (animal === null)
  {
    return <div>{<Home/>}</div>
  }

  return (
    <div className="allContent">
       <div className="btnHomePageDescription" onClick={()=>{
        window.location.href = '/'
      }}>בית</div>
      <div className="contentUp">
        <div className="btnAdopt" onClick={()=>{
                window.location.href = '/adopt/' + id['id']
        }}>לאימוץ</div>
        <h1 className="titleName">{animal?.firstName}</h1>
      </div>
      <div className="yellowLine"></div>
      <div className="allAnimalDescription">
        <div className="animalData">
          <p>{animal?.firstName} :name</p>
          <p>{ new Date(Date.now()).getFullYear() - animal?.birthYear} :age</p>
          <p>{animal?.animalType} :type</p>
          <p>{animal?.gender} :gender</p>
          <p>{animal?.description}</p>
        </div>
        <img src={animal?.pictureUrl} className="animalView" />
      </div>
    </div>
  );
}
