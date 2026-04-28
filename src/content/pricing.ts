export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  priceNote: string;
  subtitle: string;
  pain: string;
  features: string[];
  cta: string;
  ctaAction: "download" | "demo" | "contact";
  highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "community",
    name: "Community",
    badge: "Бесплатно",
    price: "0 ₽",
    priceNote: "навсегда, без скрытых платежей",
    subtitle: "Для индивидуальных разработчиков и самозанятых",
    pain: "Сдаёте проекты в одиночку и боитесь пропустить уязвимость в коде или ключ в репозитории?",
    features: [
      "Анализ зависимостей (SCA) — все CVE и лицензии",
      "SAST — статический анализ 10+ языков",
      "Фаззинг REST API по OpenAPI-спецификации",
      "HTML-отчёты + экспорт в JSON, Postman, cURL",
      "Расширение для VS Code + веб-интерфейс",
    ],
    cta: "Скачать бесплатно",
    ctaAction: "download",
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Популярный",
    price: "5 000 ₽ / мес",
    priceNote: "за команду",
    subtitle: "Для команд, студий и продуктовых компаний",
    pain: "Команда из 5–20 человек. Безопасность держится на одном ответственном — он не успевает.",
    features: [
      "Всё из Community",
      "Полный SAST + DAST + SCA в одном пайплайне",
      "Интеграция в CI/CD (GitLab, Jenkins, GitHub Actions)",
      "Анализ API (REST, GraphQL, gRPC)",
      "Ролевой доступ — тимлид видит картину, разработчик — свои ошибки",
      "Детальные отчёты для заказчика",
    ],
    cta: "Запросить демо",
    ctaAction: "demo",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "По договорённости",
    priceNote: "индивидуальные условия",
    subtitle: "Для предприятий с регуляторными требованиями",
    pain: "Сотни сервисов, legacy-код, требования 152-ФЗ и ГОСТ. Нужен единый центр контроля.",
    features: [
      "Всё из Pro + масштабирование",
      "Визуальное моделирование угроз (Threat Modeling)",
      "Gap-анализ зрелости РБПО (OWASP SAMM)",
      "SBOM для регуляторов (CycloneDX)",
      "On-premise или приватное облако",
      "REST API + вебхуки для Jira, SIEM, Service Desk",
      "Интеграция с системами Vulnerability Management",
    ],
    cta: "Оставить заявку",
    ctaAction: "contact",
  },
];
