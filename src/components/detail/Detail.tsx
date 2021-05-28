import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getPokemon, PokemonAttributes } from "../../API";
import { ColorString, DominantColors } from "../../utils/color";
import { LeftArrow } from "../../utils/icons";
import { sameOrigin } from "../../utils/utils";
import { PokeType } from "../pokeType/PokeType";
import styles from './Detail.module.sass';
import { Profile } from "./profile/Profile";
import { Stats } from "./stats/Stats";

interface DetailProps{id:number}

const Detail = ({id}:DetailProps)=>{

    
    ////////////////
    // Set up hooks
    
    // State management
    const [attrs, setAttrs] = useState<PokemonAttributes&{styleVars?:React.CSSProperties}|undefined>(undefined);
    
    // For back button
    const history = useHistory();
    // If a local referral (within the same session) then it is a browser "go back"
    // Otherwise, it is a link
    const localReferral = sameOrigin(document.referrer);

    // Download data
    useEffect(()=>{
        getPokemon(id).then(res=>res.data).then(attrs=>{
            // Figure out the color scheme
            // Hack to get around CORS https://lokeshdhakar.com/projects/color-thief/
            const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
            const urls = [attrs.image,googleProxyURL+attrs.image];
            DominantColors({url:urls})
                .then(colors=>{
                    // Sort from darkest to lightest
                    // const sortedColors = colors.sort((a,b)=>luminance(b)-luminance(a));
                    // Change styles state variables (css custom properties)
                    const styleVars = {} as React.CSSProperties;
                    if (colors[0]) styleVars['--primary-color']=ColorString(colors[0]);
                    if (colors[1]) styleVars['--secondary-color']=ColorString(colors[1]);
                    setAttrs({...attrs,styleVars})
            })
                // Update state
                setAttrs(attrs);
            })
    },[id]) // Only triggered on props change, not state change
     

    ////////////////
    // Render
    return (
    <div className={styles.detail} style={attrs?.styleVars}>
        {/* <div className={`${styles.loadScreen} ${attrs?styles.loaded:""}`}>
            <PokeBall className={styles.pokeball}/>
        </div> */}
        <header>
            {localReferral?
                <button onClick={history.goBack} className={styles.return}>
                    <LeftArrow className={styles.leftArrow}/>
                </button>
                :<a href="/pokemon/"><div className={styles.return}><LeftArrow className={styles.leftArrow}/></div></a>
            }
            <span className={styles.name}>{attrs?.name}</span>
            <span className={styles.id}>#{attrs?.id}</span>
        </header>
        <main>
            <section className={styles.typeContainer}>
                <span className={styles.name}>{attrs?.name}</span>
                <span className={styles.id}>#{attrs?.id}</span>
                {attrs?.types.map((type,i)=>(
                    <PokeType type={type} key={i}/>
                ))}
            </section>
            <hr/>
            <figure className={styles.figure}><img src={attrs?.image} alt={attrs?.name} ></img></figure>
            <section className={styles.stats}>
                {attrs&&<Stats stats={attrs?.stats}/>}
            </section>
            <section>
                <div className={styles.genus}>{attrs?.genus}</div>
                <div className={styles.description}>{attrs?.description}</div>
            </section>
            {attrs&&<Profile attrs={attrs}/>}
        </main>
    </div>)
}
export default Detail