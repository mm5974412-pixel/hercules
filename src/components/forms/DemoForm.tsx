"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Введите корректный e-mail"),
  phone: z.string().min(6, "Введите номер телефона"),
  company: z.string().min(2, "Введите название компании"),
  teamSize: z.string().min(1, "Выберите размер команды"),
  comment: z.string().optional(),
  consent: z.literal(true, {
    message: "Необходимо согласие на обработку ПДн",
  }),
});

type FormData = z.infer<typeof schema>;

export default function DemoForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Demo form submitted:", data);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-success" />
        </div>
        <h4 className="text-xl font-bold text-text-primary mb-2">Заявка отправлена!</h4>
        <p className="text-text-secondary">Свяжемся в течение рабочего дня.</p>
      </motion.div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 bg-bg-primary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal-primary/50 focus:ring-1 focus:ring-teal-primary/30 transition-colors text-sm";
  const errorCls = "text-xs text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input {...register("name")} placeholder="Имя" className={inputCls} />
        {errors.name && <p className={errorCls}>{errors.name.message}</p>}
      </div>
      <div>
        <input {...register("email")} type="email" placeholder="E-mail" className={inputCls} />
        {errors.email && <p className={errorCls}>{errors.email.message}</p>}
      </div>
      <div>
        <input {...register("phone")} type="tel" placeholder="Телефон" className={inputCls} />
        {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
      </div>
      <div>
        <input {...register("company")} placeholder="Компания" className={inputCls} />
        {errors.company && <p className={errorCls}>{errors.company.message}</p>}
      </div>
      <div>
        <select {...register("teamSize")} className={inputCls} defaultValue="">
          <option value="" disabled>
            Размер команды
          </option>
          <option value="1-5">1–5 человек</option>
          <option value="6-20">6–20 человек</option>
          <option value="21-50">21–50 человек</option>
          <option value="50+">50+ человек</option>
        </select>
        {errors.teamSize && <p className={errorCls}>{errors.teamSize.message}</p>}
      </div>
      <div>
        <textarea
          {...register("comment")}
          placeholder="Комментарий (опционально)"
          rows={3}
          className={inputCls}
        />
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
        {isSubmitting ? "Отправка..." : "Отправить"}
      </Button>
    </form>
  );
}
