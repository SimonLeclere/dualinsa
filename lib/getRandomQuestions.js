// lib/api.js
export async function fetchQuizQuestions(checkpointID) {
    const res = await fetch(`/api/courses/checkpoints/${checkpointID}/selectQuestions`);
    const data = await res.json();
    return data; // suppose que l'API renvoie un objet avec une clé 'questions'
}
