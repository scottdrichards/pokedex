import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { API_TO_UI_URL as API2UI, getPokemonList, PokemonList } from "../../API";
import { LeftArrow, RightArrow } from "../../utils/icons";
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



    return <div>
        <header>
            {attrs?.links.prev&& <a href={API2UI(attrs.links.prev)}>
                <LeftArrow className={styles.prev}/>
            </a>}
            <form>
                <input type="text" value={name} onChange={(e)=>onNameChange(e.target.value)} />
            </form>
            {attrs?.links.next&& <a href={API2UI(attrs.links.next)}>
                <RightArrow className={styles.next}/>
            </a>}
        </header>
        <main className={styles.list}>
        {attrs?.data.map(({id,name,image,types},i)=>(
            <a key={i} href={history.location.pathname+'/'+id}>
                <div key={i} className={styles.pokemon}>
                    <span>{name}</span>
                    <img src={image} alt={name}/>
                    <div>
                        {types.map((type,i)=>(<PokeType type={type}/>))}
                    </div>
                </div>
            </a>
        ))}
        </main>
    </div>
}