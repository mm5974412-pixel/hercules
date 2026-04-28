export interface CaseStudy {
  id: string;
  industry: string;
  icon: string;
  company: string;
  teamSize: string;
  problem: string;
  stats: { label: string; value: number; suffix: string }[];
  quote: string;
  author: string;
  role: string;
}

export const cases: CaseStudy[] = [
  {
    id: "webstudio",
    industry: "Веб-разработка",
    icon: "Monitor",
    company: "WebStudioPro",
    teamSize: "12 разработчиков, 2 QA, 1 DevOps",
    problem:
      "Пропустили SQL-инъекцию в коде интернет-магазина — сайт клиента взломали, похитили базу заказов. После инцидента заказчик потребовал регулярные отчёты о безопасности.",
    stats: [
      { label: "Критических уязвимостей найдено до релиза", value: 3, suffix: "" },
      { label: "Снижение новых уязвимостей за 3 месяца", value: 65, suffix: "%" },
      { label: "Часов на ручную проверку в неделю вместо 8", value: 1, suffix: "" },
    ],
    quote:
      "Hercules встроился в наш CI/CD за полдня. Теперь мы знаем, что каждый коммит проверен, и спим спокойно.",
    author: "Андрей",
    role: "технический директор WebStudioPro",
  },
  {
    id: "finsecure",
    industry: "Финтех",
    icon: "Landmark",
    company: "FinSecure",
    teamSize: "8 разработчиков, 1 security-инженер",
    problem:
      "Более 50 open-source библиотек, никто не отслеживал уязвимости. Юристы потребовали SBOM, а новость о критической CVE застала врасплох.",
    stats: [
      { label: "Критических CVE найдено в модуле платежей", value: 2, suffix: "" },
      { label: "Часа на обновление зависимостей", value: 2, suffix: "" },
      { label: "Пропущенных CVE за 2 месяца", value: 0, suffix: "" },
    ],
    quote:
      "Без Hercules мы бы продолжали лететь в темноте. SBOM сформировался за минуту, а CVE подсветились сразу.",
    author: "Елена",
    role: "lead developer FinSecure",
  },
  {
    id: "govtech",
    industry: "Госсектор",
    icon: "Building2",
    company: "GovTech Solutions",
    teamSize: "25 разработчиков, 3 DevOps, 2 инженера безопасности",
    problem:
      "Нет единого процесса оценки безопасности. Руководство потребовало дорожную карту по OWASP SAMM, разработчики оставляли секреты в коде.",
    stats: [
      { label: "Быстрых побед закрыто за 2 месяца", value: 80, suffix: "%" },
      { label: "API-ключей найдено в репозиториях за неделю", value: 14, suffix: "" },
      { label: "Уязвимостей найдено в API-шлюзе", value: 2, suffix: "" },
    ],
    quote:
      "Гэп-анализ Hercules — это рентген нашего DevSecOps. Дорожная карта дала нам чёткое понимание, куда двигаться.",
    author: "Михаил",
    role: "CISO GovTech Solutions",
  },
];
