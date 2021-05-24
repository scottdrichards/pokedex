/**Capitalizes the first letter in the word, causing the rest to be lower-case*/
export const CapitalFirst = (word:string)=>word[0].toLocaleUpperCase()+word.slice(1).toLocaleLowerCase();

/**
 * Lifted from https://stackoverflow.com/a/6475125/1626866
 * Changes to title case and preserves certain uppercase
 * 
 */
export const TitleCase = (phrase:string)=>{
    var i, j, str, lowers, uppers;
    str = phrase.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
      return txt.charAt(0).toLocaleUpperCase() + txt.substr(1).toLocaleLowerCase();
    });
  
    // Certain minor words should be left lowercase unless 
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
        function(txt) {
          return txt.toLocaleLowerCase();
        });
  
    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv','Hp'];
    for (i = 0, j = uppers.length; i < j; i++)
      str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
        uppers[i].toLocaleUpperCase());
  
    return str;
  }

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
