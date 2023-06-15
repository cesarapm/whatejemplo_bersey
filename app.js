const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowSecundario = addKeyword(["2", "siguiente"]).addAnswer([
  "📄 Aquí tenemos el flujo secundario",
]);

const flowDocs = addKeyword([
  "doc",
  "documentacion",
  "documentación",
]).addAnswer(
  [
    "📄 Aquí encontras las documentación recuerda que puedes mejorarla",
    "https://bot-whatsapp.netlify.app/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowTuto = addKeyword(["tutorial", "tuto"]).addAnswer(
  [
    "🙌 Aquí encontras un ejemplo rapido",
    "https://bot-whatsapp.netlify.app/docs/example/",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowGracias = addKeyword(["gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowDiscord = addKeyword(["discord"]).addAnswer(
  [
    "🤪 Únete al discord",
    "https://link.codigoencasa.com/DISCORD",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

const flowPrincipal = addKeyword([
  "Buen día, me interesa saber más información para mi sitio Web",
])
  .addAnswer("🙌 Hola bienvenido a este *Chatbot*")
  .addAnswer(
    [
      "te comparto los siguientes links de Pruebas",
      "👉 *doc* para ver la documentación",
      "👉 *gracias*  para ver la lista de videos",
      "👉 *discord* unirte al discord",
    ],
    null,
    null,
    [flowDocs, flowGracias, flowTuto, flowDiscord]
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
