import { h, FunctionalComponent } from "preact";
import { useEffect, useState} from "preact/hooks";
import Emails from "../components/Emails.tsx";

interface Email {
    id:number,
    email: string;
    asunto: string;
    cuerpo: string;
}

const Home2: FunctionalComponent = () => {
    const [emails, setEmails] = useState<Email[]>([]);

    useEffect(() => {
        const fetchEmailsFromCookie = () => {
            const cookieValue = document.cookie
                .split("; ")
                .find((cookie) => cookie.startsWith("data="));

            if (cookieValue) {
                try {
                    const data = JSON.parse(cookieValue.split("=")[1]);
                    setEmails(data);
                } catch (error) {
                    console.error("Error al parsear datos de la cookie:", error);
                }
            }
        };

        fetchEmailsFromCookie(); 
    }, []);

    return (
        <div>
            
            <h1 class="bandeja">Bandeja de Entrada</h1>
            <div class="center">
            {emails.length > 0 ? (
                <Emails emails={emails} /> 
            ) : (
                <p>No hay correos electrónicos disponibles</p>
            )}
            </div>
        </div>
    );
};

export default Home2;
