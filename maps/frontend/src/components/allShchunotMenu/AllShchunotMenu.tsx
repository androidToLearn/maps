import classes from './allShchunotMenu.module.scss'
import { useShchunaContext } from '../../provider/ShchunaContext'
import { useSelector } from 'react-redux';
import type { RootState } from '../../reduxes/StoreNeighboard';
import type { objectShchunaType } from '../../typesschema/neighboard.type';
import RowNeighboard from '../rowNeighboard/RowNeighboard';
import { useTypeSearchContext } from '../../provider/TypeSearchContext';
import { neighboardsHelper } from '../../utils/NeighboardsHelper';
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

  const {toSearch} = useTypeSearchContext()

  const orderedNeighboards = neighboardsHelper.getTheNeighboards(neighboards , toSearch)

  return <div className={classes.list}>
    {orderedNeighboards.map((neighboard : objectShchunaType, index : number) => {
        return <RowNeighboard neighboard = {neighboard} key={index} setNeighboard = {setShchuna}/>
    })}
  </div>
}