import { useParams } from "react-router-dom";
import data from "../data/allAnimals.json";
import "../styles/pageAdopt.scss";
// import "../styles/pageDescription.scss";
import { getAnimalById } from "../utils/functionnsHelper";

export default function adopt() {
  let id = useParams<string>();
  console.log(id["id"]);
  let animal = getAnimalById(data["all"], id["id"]);

  if (animal === null) {
    return <div></div>;
  }

  return (
    <div className="allContent">
      <div
        className="btnHomePageDescription"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        בית
      </div>
      <div className="contentUp">
        <div className="titlePage">
          <div className="blackSquare">הינך בדף האימוץ</div>
        </div>
        <h1 className="titleName">{animal?.firstName}</h1>
      </div>
      <div className="yellowLine"></div>
      <div className="allAnimalDescription">
        <form
          className="animalAdopt"
          onSubmit={() => {
            let name = document.getElementById("full_name")?.value;
            let address = document.getElementById("address")?.value;
            let email = document.getElementById("email")?.value;
            let phone = document.getElementById("phone")?.value;
            alert(
              "name: " +
                name +
                ",address: " +
                address +
                " ,email: " +
                email +
                " ,phone: " +
                phone
            );
          }}
        >
          <label htmlFor="full_name">full name:</label>
          <input
            type="text"
            autoComplete="full_name"
            placeholder="full name:"
            id="full_name"
            name="full_name"
          />
          <img src="../images/name.png" className="myIconField" />
          <div className="underLine"></div>
          <label htmlFor="full_name">address:</label>
          <input
            type="text"
            autoComplete="address"
            placeholder="address:"
            id="address"
            name="address"
          />
          <img src="../images/location.png" className="myIconField" />

          <div className="underLine"></div>

          <label htmlFor="email">email:</label>
          <input
            type="text"
            autoComplete="email"
            placeholder="email:"
            id="email"
            name="email"
          />
          <img src="../images/email.png" className="myIconField" />

          <div className="underLine"></div>

          <label htmlFor="full_name">phone number:</label>
          <input
            type="text"
            autoComplete="phone"
            placeholder="phone:"
            id="phone"
            name="phone"
          />
          <img src="../images/phone.png" className="myIconField" />

          <div className="underLine"></div>

          <input type="submit" value={"לאמץ"} className="submit" />
        </form>
        <div className="animalData">
          <p>{animal.firstName} :name</p>
          <p>{new Date(Date.now()).getFullYear() - animal?.birthYear} :age</p>
          <p>{animal.animalType} :type</p>
          <p>{animal.gender} :gender</p>
          <p>{animal.description}</p>
        </div>
        <img src={animal.pictureUrl} className="animalView" />
      </div>
    </div>
  );
}
