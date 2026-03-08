import type { typePropertiesListNeighboards } from '../../types/TypesAllProject'
import classes from './rowNeighboard.module.scss'
import { colorHelper } from '../../utils/ColorHelper'
import { useTypeSelectedContext } from '../../provider/TypeContext'
export default function RowNeighboard({neighboard , setNeighboard} : typePropertiesListNeighboards){

    const {setTypeSelected} = useTypeSelectedContext()
    return <div className={classes.row} onClick={()=>{
        setNeighboard(neighboard)
        setTypeSelected(1)
    }}>
        <p className={classes.textShchunaName}>{neighboard.properties.shemshchun}</p>
        <div className={classes[`color${colorHelper.getColorShcuna(neighboard)}`]} ></div>
    </div>
}