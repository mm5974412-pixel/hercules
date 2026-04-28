export interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const steps: Step[] = [
  {
    id: 1,
    title: "Установите расширение для VS Code",
    description:
      "Откройте Visual Studio Code → вкладка «Расширения» → поиск «Hercules Security» → установите. Расширение появится в боковой панели.",
    icon: "Download",
  },
  {
    id: 2,
    title: "Откройте проект и запустите анализ",
    description:
      "Откройте ваш проект (локальная папка, GitHub или GitLab). Нажмите на иконку Hercules → выберите тип анализа: SCA, SAST или FUZZ.",
    icon: "FolderOpen",
  },
  {
    id: 3,
    title: "Геркулес сканирует код и зависимости",
    description:
      "Расширение автоматически обнаруживает файлы зависимостей, анализирует исходный код на 10+ языках. Прогресс — в реальном времени.",
    icon: "ScanSearch",
  },
  {
    id: 4,
    title: "Получите отчёт с уязвимостями",
    description:
      "HTML-отчёт прямо в VS Code или в браузере: список проблем с уровнем критичности, место в коде, рекомендации по исправлению.",
    icon: "FileText",
  },
  {
    id: 5,
    title: "Исправьте и просканируйте повторно",
    description:
      "Внесите правки → нажмите «Повторить анализ» → убедитесь, что проблемы устранены. Интегрируйте в CI/CD позже через REST API.",
    icon: "CheckCircle",
  },
];
