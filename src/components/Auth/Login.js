"use client";

import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

const LoginComponent = () => {
  const { currentUser, loading, login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState("");
  const [eye, setEye] = useState(true);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateFields = () => {
    const { email, password } = formData;
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "El correo es requerido.";
      isValid = false;
      emailRef.current?.focus();
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo es inválido.";
      isValid = false;
      emailRef.current?.focus();
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida.";
      isValid = false;
      if (isValid) {
        passwordRef.current?.focus();
      }
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setErrorLogin("");
    try {
      const { email, password } = formData;
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      setErrorLogin(error.message);
      console.log("Erro al iniciar sesión:", error.message);
    }
  };

  return (
    <main className="w-full h-screen flex items-center justify-center p-5 bg-gray-50">
      <div className="max-w-md w-full text-black/80 flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-semibold text-2xl">Inicia Sesión</h2>
            <p className="text-black/40">Me alegro de volver a verte</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">
                Correo
              </label>
              <input
                id="email"
                type="email"
                ref={emailRef}
                placeholder="Ingresa tu correo electrónico..."
                value={formData.email}
                onChange={handleChange}
                className={`outline-none border py-2 px-3 rounded-md ${
                  formErrors.email ? "border-red-500" : ""
                }`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-medium">
                Contraseña
              </label>
              <div
                className={`flex items-center gap-2 border py-2 px-3 rounded-md w-full ${
                  formErrors.password ? "border-red-500" : ""
                }`}
              >
                <input
                  id="password"
                  type={eye ? "password" : "text"}
                  ref={passwordRef}
                  placeholder="Ingresa tu contraseña..."
                  value={formData.password}
                  onChange={handleChange}
                  className="outline-none w-full"
                />
                <span className="cursor-pointer" onClick={() => setEye(!eye)}>
                  {eye ? <Eye size={18} /> : <EyeOff size={18} />}
                </span>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm">{formErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="py-2 px-3 flex items-center justify-center bg-purple-700 rounded-md text-white hover:bg-purple-600 duration-200"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={20} />
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {errorLogin && (
              <p className="text-red-400 w-full text-start">{errorLogin}</p>
            )}

            <p>
              No tienes cuenta?{" "}
              <Link className="text-purple-700" href="/signup">
                Regístrate Gratis
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginComponent;
