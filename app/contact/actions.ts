"use server";

import { Resend } from "resend";
import { CONTACT } from "@/lib/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  // Valeurs saisies, renvoyées pour ne pas vider le formulaire en cas d'erreur
  values?: { name: string; email: string; message: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Champ piège invisible : rempli uniquement par les robots.
  if (String(formData.get("company") ?? "") !== "") {
    return {
      status: "success",
      message: "Merci, votre message a bien été envoyé.",
    };
  }

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (values.name.length < 2) fieldErrors.name = "Indiquez votre nom.";
  else if (values.name.length > 100)
    fieldErrors.name = "Nom trop long (100 caractères max).";
  if (!EMAIL_PATTERN.test(values.email))
    fieldErrors.email = "Indiquez une adresse email valide.";
  if (values.message.length < 10)
    fieldErrors.message = "Votre message doit faire au moins 10 caractères.";
  else if (values.message.length > 5000)
    fieldErrors.message = "Message trop long (5 000 caractères max).";
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY manquante : message non envoyé.");
    return {
      status: "error",
      message: `L'envoi est momentanément indisponible. Écrivez-nous directement à ${CONTACT.email}.`,
      values,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_FROM_EMAIL ?? "Site Indigo <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? CONTACT.email,
    replyTo: values.email,
    subject: `Nouveau message de ${values.name} via le site`,
    text: `Nom : ${values.name}\nEmail : ${values.email}\n\n${values.message}`,
    html: `<p><strong>Nom :</strong> ${escapeHtml(values.name)}<br><strong>Email :</strong> ${escapeHtml(values.email)}</p><p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>`,
  });

  if (error) {
    console.error("[contact] Échec de l'envoi Resend :", error);
    return {
      status: "error",
      message: `Le message n'a pas pu être envoyé. Réessayez plus tard ou écrivez-nous à ${CONTACT.email}.`,
      values,
    };
  }

  return {
    status: "success",
    message:
      "Merci, votre message a bien été envoyé. Nous vous répondrons rapidement.",
  };
}
