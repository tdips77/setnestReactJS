import jwt from 'jsonwebtoken';


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


export const getIdToken = () => {
    if(idTokenKey){
        return localStorage.getItem(idTokenKey)    
    }
  };
  
  export const decodeJWTAndStore = (token) => {
    try {
      const decoded = jwt.decode(token);
      if (decoded) {
        localStorage.setItem('userData', JSON.stringify(decoded));
        return decoded;
      }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
    }
    return null;
  };