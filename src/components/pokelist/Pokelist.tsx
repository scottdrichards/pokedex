import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_TO_UI_URL as API2UI, getPokemonList, PokemonList } from "../../API";
import { LeftArrow, RightArrow } from "../../utils/icons";
import { PokePreview } from "../pokePreview/PokePreview";
import { Search } from "../search/Search";
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
            
            <Search className={styles.search} onChange={onNameChange} placeHolder={"Pokédex"} textValue={name}/>

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
                <PokePreview name={name} image={image} types={types} />
            </a>
        ))}
        </main>
    </div>
}