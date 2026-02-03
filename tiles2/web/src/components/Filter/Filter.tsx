import type { filterDictType } from "../../types/typescript";
import classes from './filer.module.scss'
export default function Filter({ filter, setFilter }: filterDictType) {
  return (
    <div className={classes.menu}>
      {filter == 0 ? (
        <p className={classes.choose}>All users</p>
      ) : (
        <p
          className={classes.not_choose}
          onClick={() => {
            setFilter(0);
          }}
        >
          All users
        </p>
      )}
      <div className={classes.line}></div>

      {filter == 1 ? (
        <p className={classes.choose}>Admins</p>
      ) : (
        <p
          className={classes.not_choose}
          onClick={() => {
            setFilter(1);
          }}
        >
          Admins
        </p>
      )}
      {filter == 2 ? (
        <p className={classes.choose}>Moderators</p>
      ) : (
        <p
          className={classes.not_choose}
          onClick={() => {
            setFilter(2);
          }}
        >
          Moderators
        </p>
      )}
      {filter == 3 ? (
        <p className={classes.choose}>Editors</p>
      ) : (
        <p
          className={classes.not_choose}
          onClick={() => {
            setFilter(3);
          }}
        >
          Editors
        </p>
      )}
      {filter == 4 ? (
        <p className={classes.choose}>Viewers</p>
      ) : (
        <p
          className={classes.not_choose}
          onClick={() => {
            setFilter(4);
          }}
        >
          Viewers
        </p>
      )}
    </div>
  );
}
