"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const schema = z.object({
  email: z.string().email("Введите корректный e-mail"),
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку ПДн",
  }),
});

type FormData = z.infer<typeof schema>;

export default function DownloadForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Download form submitted:", data);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6 space-y-4"
      >
        <h4 className="text-xl font-bold text-text-primary">Готово!</h4>
        <p className="text-text-secondary text-sm">Выберите способ установки:</p>
        <div className="flex flex-col gap-3">
          <Button variant="primary" size="md" className="w-full">
            <ExternalLink size={16} />
            Установить из VS Code Marketplace
          </Button>
          <Button variant="secondary" size="md" className="w-full">
            <Download size={16} />
            Скачать .vsix-файл
          </Button>
        </div>
      </motion.div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-primary/50 focus:ring-1 focus:ring-teal-primary/30 transition-colors text-sm";
  const errorCls = "text-xs text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("email")} type="email" placeholder="Ваш e-mail" className={inputCls} />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 w-4 h-4 rounded border-border text-teal-primary focus:ring-teal-primary/30 bg-bg-primary"
        />
        <span className="text-xs text-text-muted leading-relaxed">
          Я даю согласие на обработку персональных данных в соответствии с{" "}
          <a href="#" className="text-teal-primary hover:underline">
            Политикой конфиденциальности
          </a>
        </span>
      </label>
      {errors.consent && <p className={errorCls}>{errors.consent.message}</p>}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Отправка..." : "Получить ссылку"}
      </Button>
    </form>
  );
}
