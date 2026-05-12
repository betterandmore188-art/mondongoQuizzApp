
interface MultipleChoiceQuestionProps {
  questions: { question: string; is_correct:boolean }[];
}
export function MultipleChoiceQuestion({questions}: MultipleChoiceQuestionProps) {
    return (
        <section className="grid grid-cols-2">
            {questions.map((q, index) => (
                <div key={index} className="p-4 border rounded mb-2 cursor-pointer hover:bg-gray-100">
                    {q.question}
                </div>
            ))}
        </section>
    )
}