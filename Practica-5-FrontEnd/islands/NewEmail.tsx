import { useState } from "preact/hooks";
import {FunctionComponent} from "preact";
import { getCookies } from "$std/http/cookie.ts";

type ErrorState = {
    error: boolean;
    message: string;
};

let contador = 0;

const FormMail: FunctionComponent = () => {
    const [email, setEmail] = useState<string>("");
    const [asunto, setAsunto] = useState<string>("");
    const [cuerpo, setCuerpo] = useState<string>("");
    const [error, setError] = useState<ErrorState>({ error: false, message: "" });

    const validateEmail = (value: string) => {
        if (value === "") {
            setError({ error: true, message: "Email no válido" });
        } else {
            setError({ error: false, message: "" });
        }
    };

    const validateAsunto = (value: string) => {
        if (value.length < 5) {
            setError({ error: true, message: "Asunto no válido (mínimo 5 caracteres)" });
        } else {
            setError({ error: false, message: "" });
        }
    };

    const validateCuerpo = (value: string) => {
        if (value.length < 1) {
            setError({ error: true, message: "Cuerpo no válido (debe contener al menos 1 caracter)" });
        } else {
            setError({ error: false, message: "" });
        }
    };

    const updateContactsList = (newId:number,newEmail: string, newAsunto: string, newCuerpo: string) => {
        if (newAsunto === "" || newEmail === "" || newCuerpo === "") {
            setError({ error: true, message: "Debes rellenar todos los campos del formulario" });
        } else {
            const newEmailObj = { id:newId,email: newEmail, asunto: newAsunto, cuerpo: newCuerpo };

            const cookies = document.cookie.split("; ");
            const auth = cookies.find((cookie) => cookie.startsWith("auth="));

            const emails = cookies.find((cookie) => cookie.startsWith("data="));
            const emailsArray = emails ? JSON.parse(emails.split("=")[1]) : [];

            emailsArray.push(newEmailObj);

            document.cookie = `data=${JSON.stringify(emailsArray)}; path=/; ${auth ? auth : ""}`;

            alert("Email enviado");
            document.location.href = "/client/home";
        }
    };
    
        return (
        <div class="center">
            <form class="formulario">
                
                <p class="texto2">Enviar nuevo correo</p>
                <h5>Email :</h5>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    class="inputnew"
                    value={email}
                    onInput={(event) => setEmail(event.currentTarget.value)}
                    onBlur={(event) => validateEmail(event.currentTarget.value)}
                />
                <p></p>
                <h5 >Asunto: </h5>
                <input
                    type="text"
                    name="asunto"
                    placeholder="Asunto"
                    class="inputnew"
                    value={asunto}
                    onInput={(event) => setAsunto(event.currentTarget.value)}
                    onBlur={(event) => validateAsunto(event.currentTarget.value)}
                />
                <p></p>
                <h5 >Cuerpo: </h5>
                <input
                    type="text"
                    name="cuerpo"
                    placeholder="Cuerpo"
                    class="inputnew"
                    value={cuerpo}
                    onInput={(event) => setCuerpo(event.currentTarget.value)}
                    onBlur={(event) => validateCuerpo(event.currentTarget.value)}
                />
                <p></p>
                <button
                    class="boton"
                    type="submit"
                    onClick={(event) => {
                        event.preventDefault();
                        contador=contador+1;
                        updateContactsList(contador,email, asunto, cuerpo);
                        
                    }}
                    disabled={error.error}
                >
                    Enviar Correo
                </button>
                {error.error && <div class="span-2 error">{error.message}</div>}
            </form>
            
        </div>
    );
};

export default FormMail;
