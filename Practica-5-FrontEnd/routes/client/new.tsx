import FormMail from "../../islands/NewEmail.tsx"
import  Header  from "../../islands/Header.tsx"
import Home2 from "../../islands/showEmail.tsx";
import { FunctionComponent } from "preact";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import {Emails,Data} from "../../types.ts"

type auth = {
    auth2:string
}

export const handler: Handlers = {
    GET: (req: Request, ctx: FreshContext<unknown,auth>) => {
      const cookies = getCookies(req.headers);
      const auth2 = JSON.parse(cookies.auth);
      
      return ctx.render({ auth2 });
    },
  };


const Login = (props: PageProps<auth>)=>{
  const Authroization = props.data.auth2;
  if(!Authroization){
    return (
      <>
      <h1>Access denied</h1>
      <a href="/auth">Click Here</a>
      </>
    );}else{
      return(
      <>
      <Header />
      <div>
      <FormMail />
      </div>
      </>  
    )
    }
  }

  export default Login;
  