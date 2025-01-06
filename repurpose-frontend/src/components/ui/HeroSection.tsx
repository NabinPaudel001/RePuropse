import { Button } from "./Button";

export default function HeroSection() {
    return (
      <div className=" p-6 md:p-12">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
      The Platform to
    </h1>
    <h1 className="text-3xl mt-3 md:text-5xl font-bold text-gray-900">
      <span className="text-primary flex justify-center items-center">
        MANAGE
      </span>
    </h1>
    <h1 className="text-3xl mt-3 md:text-5xl font-bold text-gray-900">
      your Online Business
    </h1>
    <p className="text-gray-600 mt-8 text-sm md:text-lg">
      Blanxer is the platform to run a successful online business in Nepal.
    </p>
    <div className="mt-10 flex justify-center space-x-4">
        <Button className="px-6 py-6  ">Start For Free</Button>
        <Button className="px-6 py-6 border border-primary text-primary" variant={"outline"}>Watch a Video</Button>
      
    </div>
  </div>
</div>
    );
  }