import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_TO_UI_URL as API2UI, getPokemonList, PokemonList } from "../../API";
import { LeftArrow, Magnifier, RightArrow } from "../../utils/icons";
import { PokeType } from "../pokeType/PokeType";
import styles from './Pokelist.module.sass';

interface PokeListProps{
    onNameChange:Function,
    page?:number,
    name?:string,    
}
export const PokeList = ({onNameChange,page,name}:PokeListProps)=>{
    
    ////////////////
    // Set up hooks

    // State management
    const [attrs, setAttrs] = useState<PokemonList&{styleVars?:React.CSSProperties}|undefined>(undefined);
    
    const history = useHistory();

    // Download data when id (not state) changes
    useEffect(()=>{
        getPokemonList({...(page?{page}:{}),...(name?{name}:{})})
            .then(setAttrs)
    },[page,name])


    const getSearchBox = ()=> document.getElementsByClassName(styles.search)[0];
    useEffect(()=>{
        const searchBox = getSearchBox();
        // innerHTML XOR name
        if (searchBox.innerHTML===""? name:!name) searchBox.innerHTML = name||""
    },[name])
    // const clearSearch = ()=>{
    //     getSearchBox().innerHTML="";
    //     onNameChange("");
    // }

    return <div className={styles.pokeList}>
        <header>
            {
            // Left arrow
            attrs?.links.prev?
                // If there are previous links
                <a href={API2UI(attrs.links.prev)} className={styles.prev}>
                    <LeftArrow className={styles.prev}/>
                </a>
                // Else just do an empty spot
                :<div className={styles.prev}></div>}

            <div className={styles.searchContainer}> 
                <Magnifier className={styles.magnifier}/>
                <div
                    contentEditable="true"
                    onInput={(e)=>onNameChange(e.currentTarget.innerText)}
                    className={styles.search}
                    >
                </div>
                {name&&<button onClick={()=>onNameChange("")} className={styles.clearSearch}>X</button>}
            </div>
            
            {
            // Right Arrow
            attrs?.links.next?
                // If there is a next page
                <a href={API2UI(attrs.links.next)} className={styles.next}>
                    <RightArrow className={styles.next}/>
                </a>
                // Else just do empty slot
                :<div className={styles.next}></div>}

        </header>

        <main className={styles.list}>
        {attrs?.data.map(({id,name,image,types},i)=>(
            <a key={i} href={history.location.pathname+(history.location.pathname[history.location.pathname.length-1]==='/'?'':'/')+id}>
                <div className={styles.pokemon}>
                    <header><span>{name}</span></header>
                    <main>
                        <img src={image} alt={name}/>
                        <div className={styles.typesContainer}>
                            {types.map((type,i)=>(<PokeType type={type} key={type}/>))}
                        </div>
                    </main>
                </div>
            </a>
        ))}
        </main>
    </div>
}