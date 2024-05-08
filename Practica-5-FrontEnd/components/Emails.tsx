import { h, FunctionalComponent } from "preact";

interface Email {
    email: string;
    asunto: string;
    cuerpo: string;
}

interface EmailsProps {
    emails: Email[];
}

const Emails: FunctionalComponent<EmailsProps> = ({ emails }) => {
    return (
        <div>
            
            
                {emails.map((email, index) => (
                    <div class="emailbox">
                    
                        <strong>De:</strong> {email.email} <br />
                        <strong>Asunto:</strong> {email.asunto} <br />
                        <strong>Cuerpo:</strong> {email.cuerpo}
                    
                    </div>
                ))}
            
        </div>
    );
};

export default Emails;
