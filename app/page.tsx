'use server';
import { Button } from "./components/buttons";
import IconSelector from "./components/icon-selector";
import Input from "./components/input";


export default async function Home() {
  async function logginQuiz (formData) {
    'use server';
    const quizCode = formData.get("quiz-code");
    const username = formData.get("username");
    const icon = formData.get("icon-selector");
    console.log({quizCode, username, icon});
    // TODO : wee need validate and send to the server to loggin
  }
  return (
   <form 
    action={logginQuiz}
   className="p-8 gap-4 flex flex-col justify-center items-center  flex-1">
      <h1 className="font-bold mb-8 text-accent text-2xl">Mondongo App</h1>
      <Input name="quiz-code" placeholder='000 000' type="number"/>
      <Input name="username" placeholder='Your username'/>
      <IconSelector/>
      <div className=" h-full flex items-end">

        <Button type="submit">
          Enter quizz
        </Button>
      </div>
   </form>
  );
}
