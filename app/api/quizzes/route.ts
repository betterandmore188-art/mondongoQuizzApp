'use server'

import { MongoRepository } from "@/app/utils/mongoRepository";

interface Question{
    options:string[];
    answer:number; // Index correct answer
    title:string;
    type:"multiple-choice" | "true-false" | "one-choice";
}

async function createQuiz(name:string,questions:Question[]){
    const repo = await MongoRepository.create("quizzes");

    // TODO : agruega el eschema validator con Zod (https://zod.dev/api)

    await repo.insertOne("quizzes",{
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        questions
    })

}