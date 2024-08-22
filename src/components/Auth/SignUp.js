"use client";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpComponent = () => {
  const { currentUser, loading } = useAuth();
  const [eye, setEye] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateFields = () => {
    const { name, email, password } = formData;
    const newErrors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!name) {
      newErrors.name = "El nombre es requerido.";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "El correo es requerido.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo es inválido.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida.";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field) => {
    validateFields();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setError("");
    try {
      const { email, password, name } = formData;
      await signup(email, password, name);
      router.push("/dashboard");
    } catch (err) {
      setError("Error al registrar: " + err.message);
    }
  };

  return (
    <main className="w-full h-screen">
      <div className="w-full h-full flex items-center justify-center p-5">
        <div className="max-w-md w-full text-black/80 flex flex-col gap-3">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-medium text-2xl">
                Registrate{" "}
                <span className="text-purple-700 font-semibold">Gratis</span>
              </h2>
              <p className="text-black/40">Bienvenido a Task Manager</p>
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre..."
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  className={`outline-none border py-2 px-3 rounded-md ${
                    formErrors.name ? "border-red-500" : ""
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm">{formErrors.name}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium">
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo eléctronico..."
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
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
                  className={`outline-none flex items-center gap-2 border py-2 px-3 rounded-md w-full ${
                    formErrors.password ? "border-red-500" : ""
                  }`}
                >
                  <input
                    id="password"
                    type={eye ? "password" : "text"}
                    placeholder="Ingresa tu contraseña..."
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
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

              <button className="py-2 px-3 flex items-center justify-center bg-purple-700 rounded-md text-white hover:bg-purple-600 duration-200">
                {!loading ? (
                  "Registrarse"
                ) : (
                  <div className=" w-5">
                    <LoaderCircle className="animate-spin" />
                  </div>
                )}
              </button>
              {error && (
                <p className="text-red-400 w-full text-start">{error}</p>
              )}
              <p>
                Ya tienes cuenta?{" "}
                <Link className="text-purple-700" href="/">
                  Inicia Sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpComponent;
