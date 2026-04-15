import type { typePropertiesListNeighboards } from '../../types/TypesAllProject'
import classes from './rowNeighboard.module.scss'
import { colorHelper } from '../../utils/ColorHelper'
import { useTypeSelectedContext } from '../../provider/TypeContext'
import { useStateContext } from '../../provider/StateContext'
export default function RowNeighboard({neighboard , setNeighboard} : typePropertiesListNeighboards){

    const {setTypeSelected} = useTypeSelectedContext()
    const {state} = useStateContext()
    return <div className={classes.row} onClick={()=>{
        setNeighboard(neighboard)
        setTypeSelected(1)
    }}>
        <p className={classes.textShchunaName}>{neighboard.properties.shemshchun}</p>
        <div className={classes[`color${colorHelper.getColorShcuna(neighboard , state)}`]} ></div>
    </div>
}