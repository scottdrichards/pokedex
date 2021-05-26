import React, { useEffect, useState } from "react";
import { getPokemon, PokemonAttributes } from "../../API";
import { ColorString, DominantColors } from "../../utils/color";
import { CapitalFirst, TitleCase } from "../../utils/utils";
import { Meter } from "../meter/Meter";
import { PokeType } from "../pokeType/PokeType";
import styles from './Detail.module.sass';

interface DetailProps{id:number}

const Detail = ({id}:DetailProps)=>{

    
    ////////////////
    // Set up hooks
    
    // State management
    const [attrs, setAttrs] = useState<PokemonAttributes&{styleVars?:React.CSSProperties}|undefined>(undefined);
    
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
        <header>
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
                {attrs&&Object.entries(attrs.stats).map(([k,v],i)=>(
                    <div className={styles.stat} key={i}>
                        <div className={styles.label} >{TitleCase(k)}</div>
                        <Meter className={styles.meter} val={v} min={0} max={255}/>
                    </div>
                ))}
            </section>
            <section>
                <div className={styles.genus}>{attrs?.genus}</div>
                <div className={styles.description}>{attrs?.description}</div>
            </section>
            <section className={styles.profile}>
                <header>Profile</header>
                {[
                    // Modify the properties for presentation (adding units etc.)
                    // Also adding keys here so that we don't need to repeat HTML
                    // aspects (className etc.)
                    ["Height",attrs?.height + " m"],
                    ["Weight", attrs?.weight+" kg"],
                    ["Egg Groups", attrs?.egg_groups.map(CapitalFirst).join(", ")],
                    ["Abilities", attrs?.abilities.map(CapitalFirst).join(", ")]
                ].map(([label,value])=>(
                    <div key={label}>
                        <div className={styles.label}>{label}</div>
                        <div className={styles.value}>{value}</div>
                    </div>
                ))}
            </section>
        </main>
    </div>)
}
export default Detail