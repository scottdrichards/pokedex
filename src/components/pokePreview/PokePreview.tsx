import { PokeType } from '../pokeType/PokeType'
import styles from './PokePreview.module.sass'

interface PokePreviewParams{
    name: string,
    image: string,
    types: string[]
}
export const PokePreview = ({name, image, types}:PokePreviewParams)=>
<div className={styles.pokemon}>
    <header><span>{name}</span></header>
    <main>
        <img src={image} alt={name}/>
        <div className={styles.typesContainer}>
            {types.map((type,i)=>(<PokeType type={type} key={type}/>))}
        </div>
    </main>
</div>

