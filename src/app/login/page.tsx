"use client";
import { useState } from "react";
import { createClientBrowser } from "@/lib/supabase-server";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const supabase = createClientBrowser();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) alert(error.message);
    else alert("Te enviamos un link de acceso a tu email.");
  }

  return (
    <div className="max-w-sm mx-auto mt-24">
      <h1 className="text-2xl font-semibold mb-4">Acceder</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          className="border w-full p-2 rounded"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn">Enviar Magic Link</button>
      </form>
    </div>
  );
}
