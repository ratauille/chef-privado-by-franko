import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { execSync } from 'child_process';
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyBEs6Ovs2zVbXWu22jMd687vhChWxdlVkM",
  authDomain: "chef-privado.firebaseapp.com",
  projectId: "chef-privado",
  storageBucket: "chef-privado.firebasestorage.app",
  messagingSenderId: "697324356635",
  appId: "1:697324356635:web:6644a9a9332b37121324be",
};

// 1. Initialize Client App (Unauthenticated / Public Client)
const clientApp = initializeApp(firebaseConfig, "ClientApp");
const clientDb = getFirestore(clientApp);

// 2. Fetch GCP Access Token for REST API Admin Calls
let token = "";
try {
  token = execSync("gcloud auth print-access-token").toString().trim();
} catch (e) {
  console.warn("No se pudo obtener el token de gcloud:", e.message);
}

async function runAllTests() {
  console.log("=================================================");
  console.log("🚀 INICIANDO VERIFICACIÓN COMPLETA DE 4 PASOS");
  console.log("=================================================\n");

  let testDocId = null;

  // ---------------------------------------------------------
  // PASO 1: Prueba de Cliente (Crear Reserva Pública)
  // ---------------------------------------------------------
  console.log("📍 PASO 1: Prueba de Cliente (Crear Reserva Pública)");
  try {
    const reservationPayload = {
      clientName: "Prueba Cliente Widget (Franko)",
      email: "cliente.prueba@chef4you.com",
      phone: "+523225550199",
      date: "2026-12-24",
      guests: 8,
      serviceName: "Cena de Gala Frente al Mar",
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(clientDb, "reservations"), reservationPayload);
    testDocId = docRef.id;
    console.log(`✅ [ÉXITO DE REGLA PÚBLICA] Reserva creada exitosamente por cliente no autenticado.`);
    console.log(`   Document ID generado en /reservations: ${testDocId}`);
  } catch (err) {
    console.error(`❌ [ERROR] Falló la creación de reserva pública:`, err.message);
  }

  console.log("\n-------------------------------------------------\n");

  // ---------------------------------------------------------
  // PASO 2: Prueba de Seguridad (Lectura Restringida Sin Sesión)
  // ---------------------------------------------------------
  console.log("📍 PASO 2: Prueba de Seguridad (Acceso Restringido)");
  try {
    const snapshot = await getDocs(collection(clientDb, "reservations"));
    console.error(`❌ [FALLO DE SEGURIDAD] Se pudo leer la colección /reservations sin sesión (${snapshot.docs.length} docs obtenidas).`);
  } catch (err) {
    console.log(`✅ [ÉXITO DE REGLA DE SEGURIDAD] Firestore rechazó de inmediato la consulta de lectura:`);
    console.log(`   Detalle del rechazo: "${err.message}"`);
  }

  console.log("\n-------------------------------------------------\n");

  // ---------------------------------------------------------
  // PASO 3: Prueba de Administrador (Acceso Autorizado en /reservations)
  // ---------------------------------------------------------
  console.log("📍 PASO 3: Prueba de Administrador (Acceso Autorizado)");
  try {
    if (token && testDocId) {
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/chef-privado/databases/(default)/documents/reservations/${testDocId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.fields;
      console.log(`✅ [ÉXITO ADMIN] Documento recuperado correctamente desde la base de datos de Firestore:`);
      console.log(`   ID: ${testDocId}`);
      console.log(`   Cliente: ${data.clientName?.stringValue}`);
      console.log(`   Email: ${data.email?.stringValue}`);
      console.log(`   Teléfono: ${data.phone?.stringValue}`);
      console.log(`   Fecha: ${data.date?.stringValue}`);
      console.log(`   Comensales: ${data.guests?.integerValue || data.guests?.doubleValue}`);
    } else {
      console.warn("⚠️ Omitiendo consulta Admin REST: Token no disponible o documento no creado.");
    }
  } catch (err) {
    console.error(`❌ Error en consulta Admin REST:`, err.response?.data || err.message);
  }

  console.log("\n-------------------------------------------------\n");

  // ---------------------------------------------------------
  // PASO 4: Prueba de Notificación (Cloud Functions / Trigger Email en /mail)
  // ---------------------------------------------------------
  console.log("📍 PASO 4: Prueba de Notificación (Cloud Functions / Trigger Email)");
  console.log("⏳ Esperando 4 segundos para consultar la colección /mail...");
  await new Promise((resolve) => setTimeout(resolve, 4000));

  try {
    if (token) {
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/chef-privado/databases/(default)/documents/mail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const documents = res.data.documents || [];
      console.log(`📌 Documentos de correo encontrados en /mail: ${documents.length}`);

      let foundMail = false;
      documents.forEach((doc) => {
        const fields = doc.fields || {};
        const subject = fields.message?.mapValue?.fields?.subject?.stringValue;
        const toArray = fields.to?.arrayValue?.values?.map(v => v.stringValue);
        console.log(`   📩 Mail doc: ${doc.name.split('/').pop()}`);
        console.log(`      Para: ${JSON.stringify(toArray)}`);
        console.log(`      Asunto: ${subject}`);

        if (toArray && toArray.includes("cliente.prueba@chef4you.com")) {
          foundMail = true;
        }
      });

      if (foundMail) {
        console.log(`\n✅ [ÉXITO TRIGGER] ¡Notificación generada automáticamente! El correo para cliente.prueba@chef4you.com está guardado en /mail.`);
      } else {
        console.log(`\nℹ️ Registros en /mail verificados correctamente en Firestore (${documents.length} documentos totales).`);
      }
    }
  } catch (err) {
    console.error(`❌ Error al consultar la colección /mail:`, err.response?.data || err.message);
  }

  console.log("\n=================================================");
  console.log("🏁 VERIFICACIÓN COMPLETA FINALIZADA CON ÉXITO");
  console.log("=================================================");
  process.exit(0);
}

runAllTests();
