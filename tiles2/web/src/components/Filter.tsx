import type { filterDictType } from "../types/typescript";
export default function Filter({
  filter,
  isScreenSmall,
  setIsMenuOpened,
  setFilter,
}: filterDictType) {
  return (
    <div className="menu">
      {filter == 0 ? (
        <p className="choose">All users</p>
      ) : (
        <p
          className="not_choose"
          onClick={() => {
            setFilter(0);
            if (isScreenSmall) setIsMenuOpened(false);
          }}
        >
          All users
        </p>
      )}
      <div className="line"></div>

      {filter == 1 ? (
        <p className="choose">Admins</p>
      ) : (
        <p
          className="not_choose"
          onClick={() => {
            setFilter(1);

            if (isScreenSmall) setIsMenuOpened(false);
          }}
        >
          Admins
        </p>
      )}
      {filter == 2 ? (
        <p className="choose">Moderators</p>
      ) : (
        <p
          className="not_choose"
          onClick={() => {
            setFilter(2);
            if (isScreenSmall) setIsMenuOpened(false);
          }}
        >
          Moderators
        </p>
      )}
      {filter == 3 ? (
        <p className="choose">Editors</p>
      ) : (
        <p
          className="not_choose"
          onClick={() => {
            setFilter(3);
            if (isScreenSmall) setIsMenuOpened(false);
          }}
        >
          Editors
        </p>
      )}
      {filter == 4 ? (
        <p className="choose">Viewers</p>
      ) : (
        <p
          className="not_choose"
          onClick={() => {
            setFilter(4);
            if (isScreenSmall) setIsMenuOpened(false);
          }}
        >
          Viewers
        </p>
      )}
    </div>
  );
}
