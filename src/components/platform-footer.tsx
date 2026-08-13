import { PLATFORM_SUPPORT_EMAIL, supportComposeHref } from "@/lib/platform-support";

/**
 * Rodapé institucional das telas internas.
 *
 * Discreto de propósito: uma linha com o canal de suporte. O link abre o
 * compositor do Gmail em nova aba, com destinatário e assunto já preenchidos —
 * não depende do cliente de e-mail instalado na máquina nem de integração da
 * plataforma.
 *
 * Não aparece nas rotas exclusivas do Superadmin (ver `PlatformShell`).
 */
export function PlatformFooter() {
  return (
    <footer data-print-hidden="true" className="mx-auto max-w-[1760px] px-2 pb-5 pt-1 text-center text-xs text-[var(--text-secondary)] sm:px-5 lg:px-6">
      <p className="border-t border-[var(--border-subtle)] pt-3">
        Precisa de ajuda? Fale conosco:{" "}
        <a
          href={supportComposeHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Escrever para o suporte (${PLATFORM_SUPPORT_EMAIL}) — abre o webmail em nova aba`}
          className="font-semibold underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          style={{ color: "#8f8f8f" }}>
        {PLATFORM_SUPPORT_EMAIL}
        </a>
      </p>
    </footer>
  );
}