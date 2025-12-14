
import type {filterType } from "../types/typescript";

export default function Filter({dict} :filterType )
{
    return  <div className="menu">
              {dict['filter'] == 0 ? (
                <p className="choose">All users</p>
              ) : (
                <p
                  className="not_choose"
                  onClick={() => {
                    dict['setFilter'](0);
                    if (dict['isScreenSmall']) dict['setIsMenuOpened'](false);
                  }}
                >
                  All users
                </p>
              )}
              <div className="line"></div>

              {dict['filter'] == 1 ? (
                <p className="choose">Admins</p>
              ) : (
                <p
                  className="not_choose"
                  onClick={() => {
                    dict['setFilter'](1);

                    if (dict['isScreenSmall']) dict['setIsMenuOpened'](false);
                  }}
                >
                  Admins
                </p>
              )}
              {dict['filter'] == 2 ? (
                <p className="choose">Moderators</p>
              ) : (
                <p
                  className="not_choose"
                  onClick={() => {
                    dict['setFilter'](2);
                    if (dict['isScreenSmall']) dict['setIsMenuOpened'](false);
                  }}
                >
                  Moderators
                </p>
              )}
              {dict['filter'] == 3 ? (
                <p className="choose">Editors</p>
              ) : (
                <p
                  className="not_choose"
                  onClick={() => {
                    dict['setFilter'](3);
                    if (dict['isScreenSmall']) dict['setIsMenuOpened'](false);
                  }}
                >
                  Editors
                </p>
              )}
              {dict['filter'] == 4 ? (
                <p className="choose">Viewers</p>
              ) : (
                <p
                  className="not_choose"
                  onClick={() => {
                    dict['setFilter'](4);
                    if (dict['isScreenSmall']) dict['setIsMenuOpened'](false);
                  }}
                >
                  Viewers
                </p>
              )}
            </div>
}