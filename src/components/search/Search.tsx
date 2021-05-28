import { useEffect } from "react";
import { Magnifier } from "../../utils/icons"
import styles from './Search.module.sass'

interface SearchParams{
    textValue?:string,
    onChange:Function,
    placeHolder?:string,
    className?:string
}

/**
 * onChange is for sending state change up
 * while textValue is for receiving state change down
 */
export const Search = ({textValue, onChange,placeHolder, className}:SearchParams)=>{
    
    // We need to track state changes so that we don't update state if the change
    // is just bouncing back from something we emitted (updating will move the cursor)
    const getSearchBox = ()=> document.getElementsByClassName(styles.search)[0];
    useEffect(()=>{
        const searchBox = getSearchBox();
        // innerHTML XOR name
        if (searchBox.innerHTML===""? textValue:!textValue) searchBox.innerHTML = textValue||""
    },[textValue])

    return (
    <div className={styles.searchContainer+" "+className}> 
        <Magnifier className={styles.magnifier}/>
        <div
            contentEditable="true"
            onInput={(e)=>onChange(e.currentTarget.innerText)}
            className={styles.search}
            data-placeholder={placeHolder}
            >
        </div>
        {textValue&&<button onClick={()=>onChange("")} className={styles.clearSearch}>X</button>}
    </div>)
}