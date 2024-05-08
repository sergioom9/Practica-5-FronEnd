import Header from "../../islands/Header.tsx";
import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Home2 from "../../islands/showEmail.tsx";
import { FunctionComponent } from "preact";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { Data, Emails } from "../../types.ts";

type Info = {
  auth2: string;
  email: Emails;
};

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext<unknown, Info>) => {
    const cookies = getCookies(req.headers);
    const auth2 = JSON.parse(cookies.auth);
    const emails = JSON.parse(cookies.data);
    const email = emails.find((email: Emails) => email.id === 1);
    return ctx.render({ auth2, email });
  },
};

const EmailDetail = (props: PageProps<Info>) => {
  const Authroization = props.data.auth2;
  const email = props.data.email;
  if (!Authroization) {
    return (
      <>
        <h1>Access denied</h1>
        <a href="/auth">Click Here</a>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div class="center">
            <h1 class="email-title">Bandeja de Entrada</h1>
            <div class="center2">
            <h2 class="email-subject">Asunto: {email.asunto}</h2>
            <h3 class="email-from">De: {email.email}</h3>
            <h3 class="email-body">Texto: {email.cuerpo}</h3>
          </div>
        </div>
      </>
    );
  }
};

export default EmailDetail;
