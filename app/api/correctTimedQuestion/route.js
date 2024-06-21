import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt"
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {

  const token = await getToken({ req })

  if (!token) {
    return NextResponse.json({ message: 'User not connected' }, { status: 401 }); // Return error 401 if user unauthenticated
  }

  let { question, solution, reponse } = await req.json();

  if (!question || !solution) {
    return NextResponse.json({ message: 'Invalid input: question, solution, and reponse are required' }, { status: 400 });
  }

  if (!reponse || reponse === '') reponse = 'No answer provided';

  let response;

  try {
    response = await getAnswer(question, solution, reponse);
  } catch (error) {
    return NextResponse.json({ message: 'Error while processing the request' }, { status: 500 });
  }
  return NextResponse.json(response, { status: 200 });

}



async function getAnswer(question, solution, reponse) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": "You are an AI system that evaluates student's answers to open questions. \n\nPrompt will contain the following elements : the question, the solution and the student's proposition.\n\nYou should always answer with JSON format. If the student's answer is not exactly letter-for-letter the same as the solution, but the meaning is the same or if the student makes only a few spelling mistake, the answer should be considered correct (example : bleue instead of bleu must be correct or vleu instead of bleu is also correct). You should always provide a correction in the same language of the student answer (example : if the student answer is in French, you should answer in French too). Don't just repeat the solution provided, but adapt your correction to the student's answer. For example, if the student has made a mistake in his reasoning, indicate where the error lies. \n\nUse the following JSON format :\n\n{ \"correction\" : string, \"correct\" : boolean }"
      },
      {
        "role": "user",
        "content": `Question : ${question} \n\nSolution : ${solution} \n\nRéponse de l'étudiant : ${reponse}`
      },

    ],
    "model": "llama3-70b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "response_format": {
      "type": "json_object"
    },
    "stop": null
  });

  const jsonData = JSON.parse(chatCompletion.choices[0]?.message?.content);

  return jsonData;
}