'use client'

import Button from "../components/Button";

export default function TestPage() {

    const question = "De quelle couleur est le ciel ?"
    const solution = "Bleu"
    const reponse = "Rouge"

    const handleSubmit = async () => {
        try {
            const response = await fetch("api/IA", {
                method: "POST",

                body: JSON.stringify({ question, solution, reponse }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching the API:', error);
        }
    };

    return (
        <Button onClick={handleSubmit}>
            Test IA
        </Button>
    );
}