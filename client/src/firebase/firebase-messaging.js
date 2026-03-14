// src/firebase/firebase-messaging.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBbonfvpicXDspakzzuiDszbRu2Ic08Izw",
    authDomain: "breast-cancer-prediction-bdd08.firebaseapp.com",
    projectId: "breast-cancer-prediction-bdd08",
    messagingSenderId: "252659094655",
    appId: "1:252659094655:web:611a370284158bc3199b4a",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

let messaging = null;
isSupported().then((supported) => {
    if (supported) {
        messaging = getMessaging(app);
        console.log("✅ Firebase Messaging initialized");
    } else {
        console.warn("⚠️ This browser doesn’t support Firebase Cloud Messaging.");
    }
});

// Request notification permission and get FCM token
const requestFCMPermission = async() => {
    if (!messaging) {
        console.warn("❌ Messaging not supported on this browser.");
        return null;
    }

    try {
        const token = await getToken(messaging, {
            vapidKey: 'BOjs5w-Elz-nIv01xLZqCve2iZaVhRND8PbIKa_fdvX2nAYdpwad5_XF9EZp3lqARy0xHcq_4SGMRq5-58YJ9Y4',
        });

        if (token) {
            console.log('✅ FCM Token:', token);
            return token;
        } else {
            console.warn('⚠️ No registration token available. Request permission.');
            return null;
        }
    } catch (err) {
        console.error('❌ FCM permission error:', err);
        return null;
    }
};

// Listen for foreground messages
const listenForMessages = () => {
    if (!messaging) {
        console.warn("❌ Messaging not initialized.");
        return;
    }

    onMessage(messaging, (payload) => {
        console.log('📩 Message received:', payload);
        const { title, body } = payload.notification || {};
        if (title || body) alert(`${title}\n${body}`);
    });
};

// ✅ Export both functions only once
export { requestFCMPermission, listenForMessages };