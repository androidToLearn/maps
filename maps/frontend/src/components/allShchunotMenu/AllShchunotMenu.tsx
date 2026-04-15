import classes from './allShchunotMenu.module.scss'
import { useShchunaContext } from '../../provider/ShchunaContext'
import { useSelector } from 'react-redux';
import type { RootState } from '../../reduxes/StoreNeighboard';
import type { objectShchunaType } from '../../typesschema/neighboard.type';
import RowNeighboard from '../rowNeighboard/RowNeighboard';
import { useTypeSearchContext } from '../../provider/TypeSearchContext';
import { neighboardsHelper } from '../../utils/NeighboardsHelper';
import { useStateContext } from '../../provider/StateContext';
export default function AllShchunotMenu()
{
    const neighboards = useSelector(
    (state: RootState) => state.neighboards.neighboards,
  );
  const {setShchuna} = useShchunaContext()
  if(neighboards === null)
  {
    return <>error no data</>
  }

  const {state} = useStateContext()
  const {toSearch} = useTypeSearchContext()

  if (state === 1) {
    return <p className={classes.cherom1}>במדרג חירום 1 אין הוראות התגוננות מיוחדות</p>
  }
  if (state === 2) {
    return <p className={classes.cherom1}>במדרג חירום 2 אין הוראות התגוננות מיוחדות</p>

  }

  const orderedNeighboards = neighboardsHelper.getTheNeighboards(neighboards , toSearch)

  return <div className={classes.list}>
    {orderedNeighboards.map((neighboard : objectShchunaType, index : number) => {
        return <RowNeighboard neighboard = {neighboard} key={index} setNeighboard = {setShchuna}/>
    })}
  </div>
}