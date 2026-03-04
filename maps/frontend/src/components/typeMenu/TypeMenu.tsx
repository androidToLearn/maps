import classes from "./typeMenu.module.scss";
export default function TypeMenu({ typeSelected, setTypeSelected }: any) {
  return (
    <div className={classes.menuUp}>
      <div
        className={classes[`oneInMenu${typeSelected === 0}`]}
        onClick={() => {
          setTypeSelected(0);
        }}
      >
        שכונות
      </div>
      <div
        className={classes[`oneInMenu${typeSelected === 1}`]}
        onClick={() => {
          setTypeSelected(1);
        }}
      >
        מוסדות
      </div>
      <div
        className={classes[`oneInMenu${typeSelected === 2}`]}
        onClick={() => {
          setTypeSelected(2);
        }}
      >
        מוסד
      </div>
    </div>
  );
}
