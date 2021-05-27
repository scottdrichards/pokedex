
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
