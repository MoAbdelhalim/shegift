/* ============================================================
   SHEGIFT — app configuration
   The only file you edit after deployment.
   ============================================================ */
window.APP_CONFIG = {

  /* store identity ------------------------------------------ */
  shop: {
    brand:    "SHEGIFT",
    city:     "CASABLANCA",
    delivery: 30,          // delivery fee in DH
    freeFrom: 400          // free delivery from this subtotal
  },

  /* how customers reach you --------------------------------- */
  contact: {
    whatsapp:  "212600000000",   // ← PUT YOUR REAL NUMBER HERE (no +, no spaces)
    instagram: "https://www.instagram.com/shegift.store",
    email:     ""
  },

  /* data service -------------------------------------------- */
  sync: {
    key:      "AIzaSyCsvuZZ9kuexxQum75LPP_1qhIl1kYrtCc",
    domain:   "gift-29d03.firebaseapp.com",
    endpoint: "https://gift-29d03-default-rtdb.europe-west1.firebasedatabase.app",
    space:    "gift-29d03"
  },

  /* where records live inside the data service --------------- */
  paths: { products:"catalogue", categories:"categories", settings:"settings", orders:"orders" },

  /* image service ------------------------------------------- */
  media: {
    space:   "tlq6wzsg",
    channel: "Packetss",
    folder:  "shegift",
    transform: "f_auto,q_auto,w_900"
  },

  /* who may open the workspace ------------------------------- */
  access: { ownerId: "LU84LyBjakPv7oTjnq4YDnHPUYY2" },

  /* runtime libraries --------------------------------------- */
  libs: {
    core: "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
    data: "https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js",
    auth: "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"
  }
};
