import React, { useMemo, useState } from "react";
import { MessageCircle, Phone, Bot, Send } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "34604151983";
const INSTAGRAM_URL = "https://www.instagram.com/fermentados_by_jimmy/";
const LOGO_URL = "/logo-jimmy.jpg";

const products = [
  {
    title: "Pan de masa madre artesanal",
    text: "Elaborado artesanalmente por Jimmy, con fermentación lenta y sabor auténtico.",
    price: "4,50 €",
    image: "/pan-masa-madre.jpg",
  },
  {
    title: "Focaccia",
    text: "Esponjosa, aromática y perfecta para acompañar comidas o compartir.",
    price: "6,50 €",
    image: "/focaccia.jpg",
  },
  {
    title: "Arepas venezolanas",
    text: "Preparadas de forma casera, ideales para encargos y ocasiones especiales.",
    price: "3,50 €",
    image: "/arepas.jpg",
  },
];

const faqs = [
  {
    q: "¿Cómo hago un pedido?",
    a: "Rellena el formulario y se abrirá WhatsApp con el mensaje listo para enviar a Jimmy.",
  },
  {
    q: "¿Cómo se paga?",
    a: "El pago se realiza siempre en efectivo al entregar el pedido.",
  },
  {
    q: "¿Se puede elegir día y hora?",
    a: "Sí, puedes indicarlo en el pedido y Jimmy confirmará la disponibilidad.",
  },
  {
    q: "¿Qué productos ofrece?",
    a: "Pan de masa madre artesanal, focaccia y arepas venezolanas.",
  },
];

const chatbotRules = [
  {
    keywords: ["pago", "efectivo", "pagar"],
    answer: "El pago se realiza en efectivo al entregar el pedido.",
  },
  {
    keywords: ["pedido", "encargo", "comprar"],
    answer: "Puedes hacer tu pedido desde el formulario y enviarlo directamente por WhatsApp.",
  },
  {
    keywords: ["hora", "día", "dia", "entrega"],
    answer: "Puedes proponer día y hora en el formulario y Jimmy lo confirmará contigo por WhatsApp.",
  },
  {
    keywords: ["productos", "pan", "focaccia", "arepas", "precio", "precios"],
    answer:
      "Ahora mismo mostramos precios orientativos: pan 4,50 €, focaccia 6,50 € y arepas desde 3,50 €.",
  },
];

function getWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function styles() {
  return {
    page: {
      minHeight: "100vh",
      background: "#f8f5ef",
      color: "#2a2118",
      fontFamily: "Arial, sans-serif",
      overflowX: "hidden",
      boxSizing: "border-box",
    },
    container: {
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: "20px",
      boxSizing: "border-box",
      overflowX: "hidden",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      flexWrap: "wrap",
      background: "#ffffff",
      borderRadius: 20,
      padding: 20,
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      marginBottom: 24,
      boxSizing: "border-box",
      width: "100%",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 18,
      flex: "1 1 280px",
      minWidth: 0,
      flexWrap: "wrap",
    },
    logo: {
      width: 110,
      height: 110,
      maxWidth: "100%",
      objectFit: "cover",
      borderRadius: 20,
      background: "transparent",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      flexShrink: 0,
    },
    badge: {
      display: "inline-block",
      background: "#e9dcc7",
      color: "#5b3b1f",
      padding: "8px 14px",
      borderRadius: 999,
      fontSize: 14,
      marginBottom: 12,
      fontWeight: 700,
    },
    hero: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
      gap: 32,
      alignItems: "start",
      marginBottom: 40,
      width: "100%",
      boxSizing: "border-box",
    },
    heroCard: {
      background: "#ffffff",
      borderRadius: 24,
      padding: 28,
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      width: "100%",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "clamp(32px, 5vw, 44px)",
      lineHeight: 1.1,
      margin: "0 0 16px 0",
    },
    paragraph: {
      fontSize: "clamp(16px, 2vw, 18px)",
      lineHeight: 1.7,
      color: "#5f564d",
      margin: 0,
    },
    buttonRow: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 20,
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      background: "#2a2118",
      color: "white",
      padding: "12px 18px",
      borderRadius: 14,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 15,
      boxSizing: "border-box",
    },
    whatsappButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      background: "#25D366",
      color: "white",
      padding: "12px 18px",
      borderRadius: 14,
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 15,
      boxSizing: "border-box",
      boxShadow: "0 8px 20px rgba(37, 211, 102, 0.25)",
    },
    buttonSecondary: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      textDecoration: "none",
      background: "white",
      color: "#2a2118",
      padding: "12px 18px",
      borderRadius: 14,
      border: "1px solid #d8cfc4",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 15,
      boxSizing: "border-box",
    },
    sectionTitle: {
      fontSize: "clamp(28px, 4vw, 32px)",
      marginBottom: 18,
      textAlign: "center",
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
      gap: 18,
      marginBottom: 30,
      width: "100%",
      boxSizing: "border-box",
    },
    card: {
      background: "#ffffff",
      borderRadius: 20,
      padding: 22,
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      width: "100%",
      boxSizing: "border-box",
      minWidth: 0,
    },
    productCard: {
      background: "#ffffff",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      width: "100%",
      boxSizing: "border-box",
      minWidth: 0,
    },
    productImage: {
      width: "100%",
      height: 220,
      objectFit: "cover",
      display: "block",
      background: "#e9dfd0",
    },
    productBody: {
      padding: 20,
      boxSizing: "border-box",
    },
    priceTag: {
      display: "inline-block",
      marginTop: 12,
      background: "#2a2118",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: 999,
      fontWeight: 700,
      fontSize: 14,
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
      gap: 12,
      marginBottom: 12,
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: 14,
      border: "1px solid #d9d1c7",
      fontSize: 15,
      boxSizing: "border-box",
      minWidth: 0,
    },
    textarea: {
      width: "100%",
      minHeight: 110,
      padding: "14px 16px",
      borderRadius: 14,
      border: "1px solid #d9d1c7",
      fontSize: 15,
      boxSizing: "border-box",
      resize: "vertical",
      marginBottom: 12,
      minWidth: 0,
    },
    twoCol: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
      gap: 22,
      marginBottom: 30,
      width: "100%",
      boxSizing: "border-box",
    },
    chatBox: {
      height: 260,
      overflowY: "auto",
      background: "#f4efe8",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      boxSizing: "border-box",
    },
    botMsg: {
      background: "white",
      padding: "10px 14px",
      borderRadius: 14,
      marginBottom: 10,
      maxWidth: "85%",
      lineHeight: 1.5,
    },
    userMsg: {
      background: "#2a2118",
      color: "white",
      padding: "10px 14px",
      borderRadius: 14,
      marginBottom: 10,
      marginLeft: "auto",
      maxWidth: "85%",
      lineHeight: 1.5,
    },
    floating: {
      position: "fixed",
      right: 20,
      bottom: 20,
      background: "#25D366",
      color: "white",
      width: 56,
      height: 56,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 10px 28px rgba(37, 211, 102, 0.35)",
      textDecoration: "none",
      zIndex: 20,
    },
    smallNote: {
      color: "#7a7068",
      fontSize: 14,
      lineHeight: 1.6,
      marginTop: 8,
    },
    infoBox: {
      marginTop: 20,
      padding: 16,
      background: "#efe7dc",
      borderRadius: 14,
      fontSize: 15,
      color: "#3e362f",
      lineHeight: 1.7,
      fontWeight: 500,
      boxSizing: "border-box",
      width: "100%",
      maxWidth: 560,
    },
  };
}

function ImageWithFallback({ src, alt, style }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b5f54",
          fontWeight: 700,
          textAlign: "center",
          padding: 20,
        }}
      >
        Añade la imagen en la carpeta public
      </div>
    );
  }

  return <img src={src} alt={alt} style={style} onError={() => setError(true)} />;
}

function FAQChat() {
  const s = styles();
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hola, soy el asistente de Fermentados by Jimmy. Pregúntame sobre pedidos, pago, productos o precios.",
    },
  ]);
  const [text, setText] = useState("");

  const getAnswer = (value) => {
    const normalized = value.toLowerCase();
    const match = chatbotRules.find((item) =>
      item.keywords.some((keyword) => normalized.includes(keyword))
    );

    return (
      match?.answer ||
      "No tengo esa respuesta exacta, pero puedes enviar tu consulta por WhatsApp a Jimmy directamente."
    );
  };

  const send = () => {
    if (!text.trim()) return;
    const userText = text.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      { role: "bot", text: getAnswer(userText) },
    ]);

    setText("");
  };

  return (
    <div style={s.card}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <Bot size={22} />
        <h3 style={{ margin: 0 }}>Chat de ayuda</h3>
      </div>

      <div style={s.chatBox}>
        {messages.map((message, index) => (
          <div key={index} style={message.role === "bot" ? s.botMsg : s.userMsg}>
            {message.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={s.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Escribe tu duda"
        />
        <button style={s.button} onClick={send}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const s = styles();

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    pedido: "",
    fecha: "",
    hora: "",
    notas: "",
  });

  const message = useMemo(() => {
    return `Hola Jimmy, quiero hacer un pedido desde la web.

Nombre: ${form.nombre || "-"}
Teléfono: ${form.telefono || "-"}
Pedido: ${form.pedido || "-"}
Fecha deseada: ${form.fecha || "-"}
Hora deseada: ${form.hora || "-"}
Notas: ${form.notas || "-"}`;
  }, [form]);

  const whatsappOrderUrl = getWhatsappUrl(message);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        <div style={s.header}>
          <div style={s.brand}>
            <ImageWithFallback src={LOGO_URL} alt="Logo Fermentados" style={s.logo} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 20 }}>Fermentados by Jimmy</div>
              <div style={{ color: "#6e655d" }}>Fermentación lenta. Sabor auténtico.</div>
            </div>
          </div>

          <div style={s.buttonRow}>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={s.buttonSecondary}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: "#E1306C" }}>
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
              Instagram
            </a>

            <a
              href={getWhatsappUrl("Hola Jimmy, quiero información sobre tus productos.")}
              target="_blank"
              rel="noreferrer"
              style={s.whatsappButton}
            >
              <Phone size={18} /> WhatsApp
            </a>
          </div>
        </div>

        <div style={s.hero}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div style={s.badge}>Hecho artesanalmente</div>

            <h1 style={s.title}>Donde el tiempo es ingrediente.</h1>

            <p style={s.paragraph}>
              Un nuevo espacio donde la fermentación no se acelera. Donde el sabor tiene memoria.
            </p>

            <div style={s.buttonRow}>
              <a href="#pedido" style={s.button}>
                Hacer pedido
              </a>
              <a href="#chat" style={s.buttonSecondary}>
                Resolver dudas
              </a>
            </div>

            <div style={s.infoBox}>
              📍 Entregas en Algeciras y alrededores <br />
              🕒 Pedidos de lunes a sábado <br />
              ⏳ Pedidos con al menos 24h de antelación
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
            <div style={s.heroCard}>
              <h3 style={{ marginTop: 0 }}>Cómo funciona</h3>
              <p style={{ ...s.paragraph, fontSize: 16 }}>
                1. Me escribes desde la web con lo que te apetece.
                <br />
                2. Hablamos y concretamos día y hora de entrega.
                <br />
                3. Preparo todo de forma artesanal para ti.
                <br />
                4. Pagas en efectivo al recogerlo.
              </p>
            </div>
          </motion.div>
        </div>

        <h2 style={s.sectionTitle}>Productos</h2>

        <div style={s.grid3}>
          {products.map((product) => (
            <div key={product.title} style={s.productCard}>
              <ImageWithFallback src={product.image} alt={product.title} style={s.productImage} />
              <div style={s.productBody}>
                <h3 style={{ marginTop: 0 }}>{product.title}</h3>
                <p style={{ ...s.paragraph, fontSize: 16 }}>{product.text}</p>
                <div style={s.priceTag}>Desde {product.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div id="pedido" style={s.twoCol}>
          <div style={s.card}>
            <h2 style={{ marginTop: 0 }}>Haz tu pedido</h2>
            <p style={{ ...s.paragraph, fontSize: 16, marginBottom: 16 }}>
              Completa el formulario y envía tu encargo por WhatsApp.
            </p>

            <div style={s.formGrid}>
              <input
                style={s.input}
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
              />
              <input
                style={s.input}
                placeholder="Teléfono"
                value={form.telefono}
                onChange={(e) => update("telefono", e.target.value)}
              />
              <input
                style={s.input}
                placeholder="Fecha deseada"
                value={form.fecha}
                onChange={(e) => update("fecha", e.target.value)}
              />
              <input
                style={s.input}
                placeholder="Hora deseada"
                value={form.hora}
                onChange={(e) => update("hora", e.target.value)}
              />
            </div>

            <textarea
              style={s.textarea}
              placeholder="Escribe tu pedido: pan, focaccia, arepas, cantidades..."
              value={form.pedido}
              onChange={(e) => update("pedido", e.target.value)}
            />

            <textarea
              style={s.textarea}
              placeholder="Notas adicionales"
              value={form.notas}
              onChange={(e) => update("notas", e.target.value)}
            />

            <a href={whatsappOrderUrl} target="_blank" rel="noreferrer" style={s.whatsappButton}>
              <MessageCircle size={18} /> Enviar pedido por WhatsApp
            </a>

            <p style={s.smallNote}>Pago en efectivo. Precios mostrados de forma orientativa.</p>
          </div>

          <div style={s.card}>
            <h2 style={{ marginTop: 0 }}>Preguntas frecuentes</h2>

            {faqs.map((faq) => (
              <div key={faq.q} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{faq.q}</div>
                <div style={{ color: "#5f564d", lineHeight: 1.6 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="chat" style={{ marginBottom: 30 }}>
          <FAQChat />
        </div>
      </div>

      <a
        href={getWhatsappUrl("Hola Jimmy, quiero hacer un pedido.")}
        target="_blank"
        rel="noreferrer"
        style={s.floating}
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}