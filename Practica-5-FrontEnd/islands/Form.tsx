import {useState} from "preact/hooks";
import {FunctionComponent} from "preact";

type Error = {
    error:boolean;
    message:string;
  }
  
  export const Form:FunctionComponent=()=>{
    const [error,setError] = useState<Error>({
        error:false,
        message:","
    });

    const redirectHome=()=>{
        window.location.href = '/client/home';
    }

    
    const actualizarCookies=()=>{
     document.cookie = "auth=true; path=/; data=" 
    }

    const  checkEmail= (value:string) =>{
        const expression = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        if(expression.test(value)==false){
            setError({
                error:true,
                message:"Email no valido",
            })
        }
    }

    const checkPassword = (value:string) => {
        
        if(value.length<6){
            setError({
            error:true,
            message:"Contraseña menor de 6 caracteres",
        })
        }
        else setError({
            error:false,
            message:"",
        })
    }

    return (
      <div class="form">
          <form onSubmit={(e) => {
            e.preventDefault()
            actualizarCookies();
            redirectHome();
          }}>
            <label  for="email">Email</label>
            <input type="text" id="name" name="name" class="name" onBlur={(e) => checkEmail(String(e.currentTarget.value))}/>
            <p></p>
            <label  for="password">Password</label>
            <input type="password" id="password" name="password" class="password" onBlur={(e) => checkPassword(String(e.currentTarget.value))}/>
            <p></p>
            <button disabled={error.error} type="submit" class="boton">Enviar</button>
            {error.error && <div class="span-2 error">{error.message}</div>}
          </form>
      </div>
    );
  }
  
  export default Form;
  