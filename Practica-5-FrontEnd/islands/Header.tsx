import {FunctionComponent} from "preact";

const Header: FunctionComponent = () => {
  return (
    <div class="header">
      <button onClick={() => window.location.href ='/client/home'} class="boton">Nebrija</button>
      <button onClick={() =>{
         document.cookie = "auth=false; path=/auth;"
         window.location.reload();
         window.location.href ='/auth'
      }} class="boton">Log Out</button>
    </div>
  );
};

export default Header;