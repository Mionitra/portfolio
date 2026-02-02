import { Facebook, Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";
import React from "react";
import { useState } from "react";

export default function ContactSection({ darkMode, language = "en" }) {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const response = await fetch("http://localhost:8000/email/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus("success");
        setForm({ nom: "", email: "", message: "" });
      } else {
        setStatus("error");
        const data = await response.json();
        if (data && data.errors) {
          const errors = Object.values(data.errors)
            .map((arr) => arr.join(" "))
            .join(" ");
          setErrorMsg(errors);
        } else if (data && data.detail) {
          setErrorMsg(data.detail);
        } else {
          setErrorMsg("Erreur inconnue.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erreur réseau ou serveur : " + err.message);
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <section
      id="contact"
      className={`py-20 ${darkMode ? "bg-[#0f172a]" : "bg-[#f0fff1]"}`}
    >
      <div className="w-full md:w-1/2 mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
            {language === "fr" ? "Contact" : "Get In Touch"}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              {language === "fr" ? "Entrons en contact" : "Let's Connect"}
            </h3>
            <p
              className={`mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {language === "fr"
                ? "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités de faire partie de votre vision."
                : "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision."}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-[#1e293b]" : "bg-[#e9ecef]"
                  }`}
                >
                  <Mail className="text-[#6366f1]" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    rlmionitra@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-[#1e293b]" : "bg-[#e9ecef]"
                  }`}
                >
                  <MapPin className="text-[#6366f1]" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Madagascar, Antananarivo, Tanjombato
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    darkMode ? "bg-[#1e293b]" : "bg-[#e9ecef]"
                  }`}
                >
                  <Globe className="text-[#6366f1]" />
                </div>
                <div>
                  <h4 className="font-semibold">Website</h4>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    https://portfolio-2025-iota-two.vercel.app/
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/Mionitra"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                  darkMode
                    ? "bg-[#1e293b] hover:bg-[#818cf8] hover:text-white"
                    : "bg-[#e9ecef] hover:bg-[#6366f1] hover:text-white"
                }`}
              >
                <Github/>
              </a>
              <a
                href="https://www.linkedin.com/in/lova-mionitra-9177002aa/"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                  darkMode
                    ? "bg-[#1e293b] hover:bg-[#818cf8] hover:text-white"
                    : "bg-[#e9ecef] hover:bg-[#6366f1] hover:text-white"
                }`}
              >
                <Linkedin />
              </a>
              <a
                href="https://www.facebook.com/younah.yzuki"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                  darkMode
                    ? "bg-[#1e293b] hover:bg-[#818cf8] hover:text-white"
                    : "bg-[#e9ecef] hover:bg-[#6366f1] hover:text-white"
                }`}
              >
                <Facebook/>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
