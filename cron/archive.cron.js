import cron from 'node-cron'
import { archiveAllActivities } from '../controllers/activity.controller.js'
import { json } from 'express'

const scheduleDailyArchive = () => {
    cron.schedule("0 18 * * *", async () => {
    console.log("[CRON] Démarrage de l'archivage quotidien des activités...");
    // on simule une req/res minimale pour appeler le contrôleur côté serveur
    const fakeReq = {};
    const fakeRes = {
        status: (code) => ({
        json: (data) => console.log(`[CRON] ${code}:`, data),
        }),
    };
    await archiveAllActivities(fakeReq, fakeRes);
    }, {
        timezone: "Europe/Paris",
    });

    console.log("[CRON] Archivage automatique programmé tous les jours à 18:00 🇫🇷");
}

export default scheduleDailyArchive