function findIdTokenKey() {
    if (typeof window !== 'undefined') {
    for (var key in localStorage) {
        if (key.endsWith('idToken')) {
            return key;
        }
    }
}
return null; // Return null if idToken key not found
}
var idTokenKey = findIdTokenKey();

function tokenlocalStorage() {
    if (typeof window !== 'undefined') {
        if(idTokenKey){
            return localStorage.getItem(idTokenKey)    
        }
    }
}
export const sessionStatus = () => {
    return tokenlocalStorage();
} 