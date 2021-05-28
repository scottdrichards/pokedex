import React from 'react'
import { ProfileAttrs } from '../../../API'
import { CapitalFirst } from '../../../utils/utils'
import styles from './Profile.module.sass'

interface ProfileParams{
    className?: string,
    attrs:ProfileAttrs
}

export const Profile = ({className,attrs}:ProfileParams)=>
<section className={styles.profile}>
    <header>Profile</header>
    {[
        // Modify the properties for presentation (adding units etc.)
        // Also adding keys here so that we don't need to repeat HTML
        // aspects (className etc.)
        ["Height",attrs.height + " m"],
        ["Weight", attrs.weight+" kg"],
        ["Egg Groups", attrs.egg_groups.map(CapitalFirst).join(", ")],
        ["Abilities", attrs.abilities.map(CapitalFirst).join(", ")]
    ].map(([label,value])=>(
        <div key={label}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{value}</div>
        </div>
    ))}
</section>