import { describe, expect, it } from "vitest";
import { ADMIN_ROLE_MODULES } from "./platform-modules";
import {
  isSuperAdminOnlyRoute,
  PLATFORM_SUPPORT_EMAIL,
  SUPER_ADMIN_ONLY_MODULES,
  supportComposeHref,
} from "./platform-support";

describe("supportComposeHref", () => {
  it("abre o compositor do Gmail no canal institucional, com assunto preenchido", () => {
    expect(supportComposeHref()).toBe(
      "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent(PLATFORM_SUPPORT_EMAIL)}` +
        `&su=${encodeURIComponent("Suporte — AgSUS Avaliações")}`,
    );
  });

  it("codifica assunto personalizado", () => {
    expect(supportComposeHref("Dúvida & acesso")).toContain(
      "&su=D%C3%BAvida%20%26%20acesso",
    );
  });

  it("não usa mailto: — o destino é sempre o webmail", () => {
    expect(supportComposeHref()).not.toContain("mailto:");
  });
});

describe("SUPER_ADMIN_ONLY_MODULES", () => {
  it("contém exatamente os módulos que o Admin não recebe", () => {
    const adminModules = new Set<string>(ADMIN_ROLE_MODULES);
    for (const moduleName of SUPER_ADMIN_ONLY_MODULES) {
      expect(adminModules.has(moduleName)).toBe(false);
    }
  });
});

describe("isSuperAdminOnlyRoute", () => {
  it("reconhece as rotas de administração global e suas subrotas", () => {
    expect(isSuperAdminOnlyRoute("/admin/equipes")).toBe(true);
    expect(isSuperAdminOnlyRoute("/admin/acessos")).toBe(true);
    expect(isSuperAdminOnlyRoute("/admin/configuracoes")).toBe(true);
    expect(isSuperAdminOnlyRoute("/admin/importacao")).toBe(true);
    expect(isSuperAdminOnlyRoute("/admin/equipes/123")).toBe(true);
  });

  it("não casa com prefixo parcial nem com as demais rotas", () => {
    expect(isSuperAdminOnlyRoute("/admin/equipes-antigas")).toBe(false);
    expect(isSuperAdminOnlyRoute("/admin")).toBe(false);
    expect(isSuperAdminOnlyRoute("/admin/pesquisas")).toBe(false);
    expect(isSuperAdminOnlyRoute("/admin/participantes")).toBe(false);
    expect(isSuperAdminOnlyRoute("/pesquisas")).toBe(false);
    expect(isSuperAdminOnlyRoute("/area")).toBe(false);
  });
});
