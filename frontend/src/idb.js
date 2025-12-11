
import { openDB } from 'idb';

const DB_NAME = 'gamified-db';
const STORE = 'lessons';

export async function getDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
        }
    });
}

export async function saveLessonsToIDB(lessons = []) {
    const db = await getDB();
    const tx = db.transaction(STORE, 'readwrite');
    for (const l of lessons) tx.store.put(l);
    await tx.done;
}

export async function getCachedLessons() {
    const db = await getDB();
    return (await db.getAll(STORE)) || [];
}
