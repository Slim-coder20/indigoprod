"use client";

import Link from "next/link";
import { useActionState } from "react";
import type {
  ProductField,
  ProductFormState,
} from "@/app/admin/(dashboard)/boutique/produits/actions";
import {
  Field,
  FormError,
  SubmitButton,
  errorProps,
  inputBorder,
  inputClass,
} from "@/components/admin/form";
import MediaInput from "@/components/admin/MediaInput";

export type ProductFormValues = Partial<Record<ProductField, string>>;

export default function ProductForm({
  action,
  releases,
  defaultValues = { shipping: "0", quantity: "0", active: "on" },
  submitLabel,
}: {
  action: (
    state: ProductFormState,
    formData: FormData,
  ) => Promise<ProductFormState>;
  releases: { id: string; label: string }[];
  defaultValues?: ProductFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {});
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? defaultValues;

  const input = (field: ProductField) => ({
    id: field,
    name: field,
    defaultValue: values[field] ?? "",
    className: `${inputClass} ${inputBorder(errors[field])}`,
    ...errorProps(field, errors[field]),
  });

  return (
    <form
      key={JSON.stringify(values)}
      action={formAction}
      noValidate
      className="flex max-w-xl flex-col gap-5"
    >
      <input
        type="hidden"
        name="initialQuantity"
        value={values.initialQuantity ?? ""}
      />

      <Field
        label="Sortie"
        id="albumId"
        error={errors.albumId}
        hint="Le produit est affiché dans la boutique avec cette sortie."
      >
        <select {...input("albumId")}>
          <option value="">— Choisir une sortie —</option>
          {releases.map((release) => (
            <option key={release.id} value={release.id}>
              {release.label}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Nom du produit"
        id="name"
        error={errors.name}
        hint="Ex. « Vinyle Chansons des Insomnies » ou simplement le titre pour un CD."
      >
        <input type="text" {...input("name")} />
      </Field>

      <Field label="Description" id="description" optional error={errors.description}>
        <textarea rows={4} {...input("description")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Prix (€)" id="price" error={errors.price}>
          <input
            type="text"
            inputMode="decimal"
            placeholder="15,00"
            {...input("price")}
          />
        </Field>
        <Field
          label="Frais de port (€)"
          id="shipping"
          error={errors.shipping}
          hint="0 : livraison offerte. Un seul tarif par commande : le plus élevé du panier."
        >
          <input
            type="text"
            inputMode="decimal"
            placeholder="4,00"
            {...input("shipping")}
          />
        </Field>
        <Field
          label="Quantité disponible"
          id="quantity"
          error={errors.quantity}
          hint="0 : affiché « Épuisé »."
        >
          <input type="number" min={0} step={1} {...input("quantity")} />
        </Field>
      </div>

      <Field
        label="Photo du produit"
        id="imageUrl"
        optional
        hint="Sans photo, la pochette de la sortie est utilisée."
      >
        <MediaInput
          name="imageUrl"
          kind="image"
          folder="produits"
          defaultValue={values.imageUrl}
          error={errors.imageUrl}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          name="active"
          defaultChecked={values.active === "on"}
          className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
        />
        <span>
          <span className="font-medium">En vente sur le site</span>
          <span className="block text-subtle">
            Décochez pour masquer le produit sans le supprimer.
          </span>
        </span>
      </label>

      <FormError message={state.message} />

      <div className="mt-2 flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/boutique"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}
