import classes from './buttonState.module.scss'
import type { StatePropertiesTypes } from '../../types/TypesAllProject'
import { useTypeSelectedContext } from '../../provider/TypeContext'

export default function ButtonState({state , setState ,stateToShow} : StatePropertiesTypes )
{
    const {setTypeSelected} = useTypeSelectedContext()
   
    return <button className={classes[String(state == stateToShow)]} onClick={()=> {
        setState(stateToShow)
        setTypeSelected(0)

    }}>{stateToShow}</button>
}