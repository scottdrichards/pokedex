
interface IconParams{
    className?:string,
    styles?:object
}

interface ArrowParams extends IconParams{
    rotation:string
}

export const ArrowIcon=({className="__arrow__",rotation="90deg"}:ArrowParams)=>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 83.43 83.24"
        style={{fill:`#fff`,stroke:`#231f20`}} className={className}>
    <g><svg>
        <polygon style={{
            transform:`rotate(${rotation})`,
            transformBox: `fill-box`,
            transformOrigin: `center`
        }}
        points="41.12 82.04 0.71 41.62 41.12 1.21 41.12 29.53 82.93 29.53 82.93 53.71 41.12 53.71 41.12 82.04"/>
    </svg></g>
</svg>

export const LeftArrow=({className}:IconParams)=>
    <ArrowIcon className={className} rotation={"0degs"}/>
export const RightArrow=({className}:IconParams)=>
    <ArrowIcon className={className} rotation={"180deg"}/>


export const PokeBall = ({className}:IconParams)=>
<svg xmlns="http://www.w3.org/2000/svg" width="99.36" height="99.36" viewBox="0 0 99.36 99.36" className={className}>
    <path d="M99.18,50H66.5a16.5,16.5,0,0,0-33,0H.82a49.18,49.18,0,0,1,98.36,0Z" transform="translate(-0.32 -0.32)" fill="#d60000"/>
    <path d="M66.5,50H99.18A49.18,49.18,0,0,1,.82,50H33.5a16.5,16.5,0,0,0,33,0Z" transform="translate(-0.32 -0.32)" fill="#fff"/>
    <path d="M66.5,50h-33a16.5,16.5,0,0,1,33,0Z" transform="translate(-0.32 -0.32)" fill="#fff"/>
    <path d="M33.5,50h33a16.5,16.5,0,0,1-33,0Z" transform="translate(-0.32 -0.32)" fill="#fff"/>
    <circle cx="49.68" cy="49.68" r="49.18" fill="none" stroke="#000" strokeMiterlimit="10"/>
    <line x1="33.18" y1="49.68" x2="0.5" y2="49.68" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="5"/>
    <line x1="98.86" y1="49.68" x2="66.18" y2="49.68" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="5"/>
    <path d="M66.5,50A16.5,16.5,0,1,1,50,33.5,16.5,16.5,0,0,1,66.5,50Z" transform="translate(-0.32 -0.32)" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="5"/>
</svg>


export const Magnifier = ({className}:IconParams)=>
<svg xmlns="http://www.w3.org/2000/svg" width="76.27" height="76.27" viewBox="0 0 76.27 76.27" className={className}>
    <line x1="70.77" y1="70.77" x2="49.36" y2="49.36" fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="11"/>
    <circle cx="30.83" cy="30.83" r="25.33" fill="none" strokeMiterlimit="10" strokeWidth="11"/>
</svg>