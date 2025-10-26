"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase-browser";

export default function TestPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchProfiles() {
    try {
      setLoading(true);
      const supabase = createBrowserClient();
      const { data, error } = await supabase.from("profiles").select("*").limit(5);
      if (error) throw error;
      setProfiles(data ?? []);
      toast.success(`Se obtuvieron ${data?.length ?? 0} perfiles.`);
    } catch (err: any) {
      toast.error(`Error al conectar con Supabase: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-10 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">🧪 Prueba Supabase + Tailwind + shadcn</h1>
      <p className="text-muted-foreground">
        Esta página prueba la conexión a Supabase (browser), Tailwind, el botón de shadcn y Sonner.
      </p>

      <Button
        className="bg-primary text-primary-foreground hover:bg-primary/80"
        onClick={fetchProfiles}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Cargar perfiles"}
      </Button>

      <pre className="p-4 rounded-md bg-muted text-sm overflow-auto">
        {profiles.length ? JSON.stringify(profiles, null, 2) : "[Sin datos]"}
      </pre>
    </main>
  );
}
