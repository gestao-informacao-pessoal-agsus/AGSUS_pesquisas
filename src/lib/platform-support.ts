import { PLATFORM_MODULE, type PlatformModule } from "./platform-modules";

/** Canal institucional de suporte da plataforma. */
export const PLATFORM_SUPPORT_EMAIL = "dados.recursoshumanos@agenciasus.org.br";

const SUPPORT_SUBJECT = "Suporte — AgSUS Avaliações";

/** Compositor web do Gmail: `view=cm` abre nova mensagem, `fs=1` em tela cheia. */
const GMAIL_COMPOSE_URL = "https://mail.google.com/mail/?view=cm&fs=1";

/**
 * Link para o canal de suporte no webmail, com destinatário e assunto prontos.
 *
 * Aponta para o compositor do Gmail em vez de `mailto:` de propósito: `mailto:`
 * depende do cliente de e-mail padrão da máquina, que varia entre estações e às
 * vezes não existe — nesses casos o clique não faz nada. A identidade da
 * plataforma já é Google (login e foto de perfil vêm da conta institucional),
 * então o webmail é o destino previsível para todo mundo.
 *
 * Sem sessão Google ativa o Gmail apresenta a escolha de conta antes do
 * rascunho. Não há envio pela plataforma: nenhum dado do usuário trafega aqui.
 */
export function supportComposeHref(subject: string = SUPPORT_SUBJECT) {
  const recipient = encodeURIComponent(PLATFORM_SUPPORT_EMAIL);
  return `${GMAIL_COMPOSE_URL}&to=${recipient}&su=${encodeURIComponent(subject)}`;
}

/**
 * Módulos exclusivos do Superadmin — administração global.
 *
 * Espelha a exclusão feita em `ADMIN_ROLE_MODULES` (`platform-modules.ts`): são
 * os três módulos que o Admin nunca recebe.
 */
export const SUPER_ADMIN_ONLY_MODULES = Object.freeze([
  PLATFORM_MODULE.ADMIN_TEAMS,
  PLATFORM_MODULE.ADMIN_ACCESS,
  PLATFORM_MODULE.ADMIN_IMPORT,
]) as readonly PlatformModule[];

/**
 * Rotas atendidas pelos módulos exclusivos do Superadmin.
 *
 * O rodapé de suporte não aparece nelas: são telas de administração global,
 * operadas por quem já é o canal de suporte.
 */
const SUPER_ADMIN_ONLY_ROUTES = Object.freeze([
  "/admin/equipes",
  "/admin/acessos",
  "/admin/configuracoes",
  "/admin/importacao",
]);

/**
 * Indica se a rota pertence à administração global (exclusiva do Superadmin).
 *
 * Compara por prefixo de segmento para cobrir subrotas (`/admin/equipes/…`) sem
 * casar com prefixo parcial de outra rota.
 */
export function isSuperAdminOnlyRoute(pathname: string) {
  return SUPER_ADMIN_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
