const admin = require('firebase-admin');

// Inicializa Firebase Admin utilizando ADC (Application Default Credentials) del CLI de Firebase / gcloud
admin.initializeApp({
  projectId: 'chef-privado',
});

const targetEmail = process.argv[2] || 'frankocheff99@gmail.com';

async function grantAdminClaim(email) {
  try {
    console.log(`🔍 Buscando usuario en Firebase Auth: ${email}...`);
    let user;
    try {
      user = await admin.auth().getUserByEmail(email);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        console.log(`ℹ️ Creando cuenta inicial para ${email} en Firebase Auth...`);
        user = await admin.auth().createUser({
          email: email,
          emailVerified: true,
          displayName: 'Franko Salgado (Admin)',
        });
      } else {
        throw err;
      }
    }

    // Asignar Custom Claim { admin: true }
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Claim { admin: true } asignado exitosamente al UID: ${user.uid}`);

    // Verificación programática inmediata leyendo el usuario de nuevo desde Firebase Auth
    const updatedUser = await admin.auth().getUser(user.uid);
    console.log('📌 Custom Claims del usuario en Firebase Auth:', updatedUser.customClaims);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al gestionar el usuario/claims en Firebase Auth:', error);
    process.exit(1);
  }
}

grantAdminClaim(targetEmail);
