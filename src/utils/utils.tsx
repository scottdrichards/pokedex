/**Capitalizes the first letter in the word, causing the rest to be lower-case*/
export const CapitalFirst = (word:string)=>word[0].toLocaleUpperCase()+word.slice(1).toLocaleLowerCase();

/**
 * Check to see if the origin is the same between local and foreign url
 * @param url The url to check against local
 * @returns 
 */
export const sameOrigin=(url:string)=>{
    const local = window.location;
    const foreign = new URL(url);
    return  local.host===foreign.host &&
            local.port===foreign.port &&
            local.protocol===foreign.protocol
}
