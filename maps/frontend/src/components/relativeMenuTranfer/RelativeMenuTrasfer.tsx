import { useTypeSearchContext } from "../../provider/TypeSearchContext";
import type { typeToSearch } from "../../types/TypesAllProject";
import type { colorsType } from "../../typesschema/colors.type";
import classes from "./relativeMenuTrasfer.module.scss";

export default function RelativeMenuTransfer() {
    const { toSearch, setToSearch } = useTypeSearchContext()
    const orderTfusa = (toSearch: typeToSearch) => {
        toSearch['orderToShowInPrecentMax'] = !toSearch['orderToShowInPrecentMax']
        setToSearch({ ...toSearch })
    }

    const orderAB = (toSearch: typeToSearch) => {
        toSearch['orderToShowInAB'] = !toSearch['orderToShowInAB']
        setToSearch({ ...toSearch })
    }

    const changeColor = (toSearch: typeToSearch, theColor: colorsType) => {
        toSearch['showColors'][theColor] = !toSearch['showColors'][theColor]
        setToSearch({ ...toSearch })
    }

    const inputNumebr = (theNumber : number) => {
        toSearch['distnace'] = theNumber
        setToSearch({...toSearch})
    }

    
    return (
        <div className={classes.relativeMenu}>
            <p className={classes.upText}>סדר לפי</p>
            <div className={classes.divRow}>
                <p className={classes.textUp}>אחוז התפוסה</p>
                <button className={classes.buttonUpMenuRelative} onClick={() => {
                    orderTfusa(toSearch)
                }}>
                </button>
                <p className={classes.textUp}>סדר הא-ב</p>
                <button className={classes.buttonUpMenuRelative} onClick={() => {
                    orderAB(toSearch)
                }}></button>
            </div>
            <p className={classes.upText}>סנן לפי</p>
            <div className={classes.numberDistance}>
                <p> ( ק"מ ) הצג עד מרחק</p>
                <input type="number" className={classes.numberInput} onInput={(e : any) => {
                    inputNumebr(e.target.value)
                }}/>
            </div>
            <div className={classes.divColor}>
                <div className={classes.buttonColors}>
                    <div className={classes[`divOneButtonColorred${toSearch['showColors']['red']}`]} onClick={() => {
                        changeColor(toSearch, 'red')
                    }}></div>
                    <div className={classes[`divOneButtonColoryellow${toSearch['showColors']['yellow']}`]} onClick={() => {
                        changeColor(toSearch, 'yellow')
                    }}></div>
                    <div className={classes[`divOneButtonColororange${toSearch['showColors']['orange']}`]} onClick={() => {
                        changeColor(toSearch, 'orange')
                    }}></div>
                </div>
                <p className={classes.textUp}>הצג לפי צבע</p>
            </div>
        </div>
    );
}