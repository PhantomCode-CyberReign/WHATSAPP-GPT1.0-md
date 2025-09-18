import makeWASocket, { useMultiFileAuthState, DisconnectReason } from "@adiwajshing/baileys";
import qrcode from "qrcode-terminal";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// ✅ OpenAI client setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  // 🔄 Connection updates
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "open") {
      console.log("✅ WhatsApp Bot Connected!");
      sock.sendMessage(sock.user.id, { text: "OPENAI connect hogea hea ✅" });
    } else if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("❌ Connection closed. Reconnect:", shouldReconnect);
      if (shouldReconnect) startBot();
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // 📩 Handle incoming messages
  sock.ev.on("messages.upsert", async (msg) => {
    try {
      const m = msg.messages[0];
      if (!m.message || m.key.fromMe) return;

      const from = m.key.remoteJid;
      const text =
        m.message.conversation ||
        m.message.extendedTextMessage?.text ||
        "";

      if (!text) return;

      console.log("📩 User:", text);

      // 🔗 Call OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }],
      });

      const reply = completion.choices[0].message.content || "⚠️ No reply from OpenAI";
      await sock.sendMessage(from, { text: reply });

    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  });
}

startBot();
