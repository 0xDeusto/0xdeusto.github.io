import React, { useState } from 'react';
import { DISCORD_INVITE_URL, MAILING_LIST_ADDRESS } from '../../config/links';
import { DiscordIcon } from '../icons';
import { useMemberCount } from './useMemberCount';
import { gmailUrl, mailtoUrl, outlookUrl } from './mailLinks';

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300';

const MAIL_BTN = `inline-flex w-full items-center justify-center border-2 border-green-600 px-4 py-2.5 text-sm font-bold text-green-400 transition-colors duration-200 hover:bg-green-600 hover:text-black sm:w-auto ${FOCUS}`;

/**
 * Contenido de "Únete": Discord + lista de correo, dentro de una ventana de terminal.
 * Se usa tanto en el modal como en la página /unete.
 *
 * @param {object} props
 * @param {() => void} [props.onClose]  Si se pasa, se muestra el botón de cerrar.
 * @param {'h1'|'h2'} [props.as]        Nivel del título.
 */
const JoinPanel = ({ onClose, as: Heading = 'h2' }) => {
  const memberCount = useMemberCount();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(MAILING_LIST_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* sin portapapeles: la dirección está en un bloque que se selecciona de un clic */
    }
  };

  return (
    <div className="w-full border-2 border-green-600 bg-black font-mono text-gray-300 shadow-[0_0_40px_rgba(34,197,94,0.15)] [color-scheme:dark]">
      {/* Barra de la ventana */}
      <div className="flex items-center justify-between border-b-2 border-green-600/60 px-4 py-2 text-xs text-green-600">
        <span aria-hidden="true">0xdecode@deusto:~$ ./unete</span>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className={`-mr-2 px-2 py-1 text-green-400 hover:text-green-200 ${FOCUS}`}
          >
            [x]
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <Heading id="join-title" className="text-2xl font-bold text-green-400 sm:text-3xl">
            Únete a 0xDecode
          </Heading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Discord es donde pasa todo. La lista de correo avisa solo de los eventos importantes,
            por si no quieres estar pendiente. Entra en uno o en los dos.
          </p>
        </div>

        {/* Discord */}
        <section aria-labelledby="join-discord" className="border border-green-600/40 p-4">
          <h3 id="join-discord" className="font-bold text-green-300">
            Discord
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Dudas, CTFs, planes y todos los eventos.
            {memberCount ? ` Ya somos ${memberCount}.` : ''}
          </p>
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 bg-green-600 px-5 py-3 font-bold text-black transition-colors duration-200 hover:bg-green-500 sm:w-auto ${FOCUS}`}
          >
            <DiscordIcon />
            <span>Entrar al Discord</span>
          </a>
        </section>

        {/* Lista de correo */}
        <section aria-labelledby="join-list" className="border border-green-600/40 p-4">
          <h3 id="join-list" className="font-bold text-green-300">
            Lista de correo
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Te escribimos solo cuando hay un evento importante.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            Para apuntarte, manda un correo vacío a esta dirección desde el email que quieras
            apuntar:
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <code className="select-all break-all border border-green-600/40 bg-green-950/30 px-2 py-2 text-xs text-green-300 sm:text-sm">
              {MAILING_LIST_ADDRESS}
            </code>
            <button
              type="button"
              onClick={copyAddress}
              className={`inline-flex items-center border border-green-600 px-3 py-2 text-xs text-green-400 transition-colors duration-200 hover:bg-green-600 hover:text-black ${FOCUS}`}
            >
              {copied ? 'Copiada' : 'Copiar'}
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-400">O ábrelo ya redactado:</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a href={gmailUrl()} target="_blank" rel="noopener noreferrer" className={MAIL_BTN}>
              Abrir en Gmail
            </a>
            <a href={outlookUrl()} target="_blank" rel="noopener noreferrer" className={MAIL_BTN}>
              Abrir en Outlook
            </a>
            <a href={mailtoUrl()} className={MAIL_BTN}>
              Abrir en mi app de correo
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JoinPanel;
