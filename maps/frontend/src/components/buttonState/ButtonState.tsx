import classes from './buttonState.module.scss'
import type { StatePropertiesTypes } from '../../types/TypesAllProject'

export default function ButtonState({state , setState ,stateToShow} : StatePropertiesTypes )
{
    return <button className={classes[String(state == stateToShow)]} onClick={()=> {
        setState(stateToShow)
    }}>{stateToShow}</button>
}