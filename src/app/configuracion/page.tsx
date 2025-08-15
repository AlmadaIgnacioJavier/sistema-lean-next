"use client";

import * as React from "react";
import { useForm, type FieldErrors } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";

export interface CompanyBillingData {
  companyLogo?: string;
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZipCode?: number;
  companyEmail: string;
  companyWeb?: string;
  companyTel: string;
  companyTaxStatus: string;
  companyCuit?: number;
  companyGrossIncome?: number;
  companyStartActivityDate: string;
  salePoint?: number;
}

export interface Props {
  readonly defaultValues?: Partial<CompanyBillingData>;
  readonly onSubmit?: (values: CompanyBillingData) => void;
}

export default function CompanyBillingForm({ defaultValues, onSubmit }: Props) {
  const form = useForm<CompanyBillingData>({
    defaultValues: {
      companyLogo: "",
      companyName: "",
      companyAddress: "",
      companyCity: "",
      companyState: "",
      companyZipCode: undefined,
      companyEmail: "",
      companyWeb: "",
      companyTel: "",
      companyTaxStatus: "",
      companyCuit: undefined,
      companyGrossIncome: undefined,
      companyStartActivityDate: "",
      salePoint: undefined,
      ...defaultValues,
    },
    mode: "onChange",
  });

  const [logoPreview, setLogoPreview] = React.useState<string | undefined>(
    defaultValues?.companyLogo
  );
  const [dragActive, setDragActive] = React.useState<boolean>(false);

  function handleLocalSubmit(values: CompanyBillingData): void {
    onSubmit?.(values);
    toast.success("Datos de facturación guardados");
  }

  function handleImportJSON(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as CompanyBillingData;
        form.reset(parsed);
        setLogoPreview(parsed.companyLogo || undefined);
        toast.success("Datos importados desde JSON");
      } catch {
        toast.error("JSON inválido");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleExportJSON(): void {
    const data = form.getValues();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company-billing-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImageFile(file?: File): void {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("El archivo debe ser una imagen");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      form.setValue("companyLogo", dataUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setLogoPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleImageFile(file);
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Datos para Comprobantes</CardTitle>
        <CardDescription>
          Completá la información de tu empresa. Estos datos se usarán para
          emitir comprobantes.
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(handleLocalSubmit)}>
        <CardContent className="space-y-8">
          {/* Identidad */}
          <section className="space-y-4">
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={onDrop}
                  className={
                    "border rounded-xl p-4 text-sm transition " +
                    (dragActive
                      ? "border-primary ring-2 ring-primary/30 bg-muted/40"
                      : "border-dashed bg-muted/20")
                  }
                >
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    {logoPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="h-16 w-auto object-contain rounded"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded bg-background border flex items-center justify-center text-xs">
                        Sin logo
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <p>
                        Arrastrá y soltá una imagen aquí, o seleccioná un
                        archivo.
                      </p>
                      <div className="flex items-center gap-2">
                        <Input
                          id="logo-file"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageFile(e.target.files?.[0] ?? undefined)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Razón social</Label>
                <Input
                  placeholder="Nombre de la empresa"
                  {...form.register("companyName")}
                />
                <FieldError name="companyName" errors={form.formState.errors} />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Domicilio</Label>
                <Input
                  placeholder="Calle y número"
                  {...form.register("companyAddress")}
                />
                <FieldError
                  name="companyAddress"
                  errors={form.formState.errors}
                />
              </div>

              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Input
                  placeholder="Ej: Paraná"
                  {...form.register("companyCity")}
                />
                <FieldError name="companyCity" errors={form.formState.errors} />
              </div>

              <div className="space-y-2">
                <Label>Provincia</Label>
                <Input
                  placeholder="Ej: Entre Ríos"
                  {...form.register("companyState")}
                />
                <FieldError
                  name="companyState"
                  errors={form.formState.errors}
                />
              </div>

              <div className="space-y-2">
                <Label>Código Postal</Label>
                <Input
                  type="number"
                  placeholder="Ej: 3100"
                  {...form.register("companyZipCode", { valueAsNumber: true })}
                />
                <FieldError
                  name="companyZipCode"
                  errors={form.formState.errors}
                />
              </div>

              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input
                  placeholder="Ej: +54 343 555-1234"
                  {...form.register("companyTel")}
                />
                <FieldError name="companyTel" errors={form.formState.errors} />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="facturacion@empresa.com"
                  {...form.register("companyEmail")}
                />
                <FieldError
                  name="companyEmail"
                  errors={form.formState.errors}
                />
              </div>

              <div className="space-y-2">
                <Label>Sitio Web (opcional)</Label>
                <Input
                  placeholder="https://empresa.com"
                  {...form.register("companyWeb")}
                />
                <FieldError name="companyWeb" errors={form.formState.errors} />
              </div>
            </div>
          </section>

          {/* Fiscal */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Datos fiscales</h3>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Condición Fiscal</Label>
                <Select
                  value={form.watch("companyTaxStatus")}
                  onValueChange={(v: string) =>
                    form.setValue("companyTaxStatus", v, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Responsable Inscripto">
                      Responsable Inscripto
                    </SelectItem>
                    <SelectItem value="Monotributo">Monotributo</SelectItem>
                    <SelectItem value="Exento">Exento</SelectItem>
                    <SelectItem value="Consumidor Final">
                      Consumidor Final
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FieldError
                  name="companyTaxStatus"
                  errors={form.formState.errors}
                />
              </div>

              <div className="space-y-2">
                <Label>CUIT</Label>
                <Input
                  type="number"
                  placeholder="20XXXXXXXXX"
                  {...form.register("companyCuit", { valueAsNumber: true })}
                />
                <FieldError name="companyCuit" errors={form.formState.errors} />
              </div>

              <div className="space-y-2">
                <Label>Ingresos Brutos</Label>
                <Input
                  type="number"
                  placeholder="Nº de IIBB"
                  {...form.register("companyGrossIncome", {
                    valueAsNumber: true,
                  })}
                />
                <FieldError
                  name="companyGrossIncome"
                  errors={form.formState.errors}
                />
              </div>

              <div className="space-y-2">
                <Label>Inicio de Actividad</Label>
                <Input
                  type="date"
                  {...form.register("companyStartActivityDate")}
                />
                <FieldError
                  name="companyStartActivityDate"
                  errors={form.formState.errors}
                />
              </div>

              <div className="space-y-2">
                <Label>Punto de Venta</Label>
                <Input
                  type="number"
                  placeholder="Ej: 1"
                  {...form.register("salePoint", { valueAsNumber: true })}
                />
                <FieldError name="salePoint" errors={form.formState.errors} />
              </div>
            </div>
          </section>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 pt-5">
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            Limpiar
          </Button>
          <div className="flex items-center gap-2">
            <Button type="submit">Guardar</Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

// ————————————————————————————————————————————————————————————————
// Small helper to render field errors consistently
// ————————————————————————————————————————————————————————————————
function FieldError({
  name,
  errors,
}: {
  name: keyof CompanyBillingData;
  errors: FieldErrors<CompanyBillingData>;
}) {
  // FieldErrors uses string index signatures internally and indexing with
  // a `keyof CompanyBillingData` can cause a TypeScript error. Cast to any
  // when indexing to keep the runtime behavior and satisfy the compiler.
  const err = (errors as any)?.[name]?.message as string | undefined;
  if (!err) return null;
  return <p className="text-sm text-destructive mt-1">{err}</p>;
}
