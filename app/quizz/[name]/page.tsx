'use client';

import { MultipleChoiceQuestion } from '@/app/components/questions';
import { useEffect, useState } from 'react';

const maxSecondsPerQuestion = 15;

export default function QuizzPage({ params }: { params: { name: string } }) {
    const [progress, setProgress] = useState(100);

    const circumference = 2 * Math.PI * 18;
    const offset = circumference - (circumference * progress / 100);


    useEffect(() => {
        const interval = setInterval(() => {

            setProgress(prev => {
                if (prev === 0) {
                    clearInterval(interval);
                    return 0;
                }
                return Math.max(0, prev - (100 / maxSecondsPerQuestion));
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 0) {
            console.log("Time's up! Moving to the next question...");
            // TODO : move to the next question
        }
    }, [progress]);

    return (
        <main className="flex flex-col p-8">
            <section
                className="flex justify-between flex-wrap h-20 max-h-30 relative"
            >

                <span className="opacity-50"> Pregunta 1/67</span>
                <div className="relative h-10 w-10">
                    <svg className="absolute inset-0 transform -rotate-90" width="40" height="40">
                        <circle cx="20" cy="20" r="18" stroke="#e5e7eb" strokeWidth="2" fill="none" />
                        <circle className='transition-all' cx="20" cy="20" r="18" stroke="#6FCF97" strokeWidth="4" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        15
                    </div>
                </div>
            </section>
            <h1 className='font-bold text-3xl text-foreground'>
                Cual es la funcion principal de una base de datos NOSQL?
            </h1>
                <MultipleChoiceQuestion questions={[
                    { question: "Almacenar datos en formato JSON", is_correct: false },
                    { question: "Proporcionar un modelo de datos flexible", is_correct: true },
                    { question: "Garantizar la consistencia de los datos", is_correct: false },
                    { question: "Soportar transacciones ACID", is_correct: false }
                ]} />
            
        </main>
    )
}