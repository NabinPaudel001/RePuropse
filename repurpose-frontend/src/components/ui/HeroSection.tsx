import { Button } from "./button";

export default function HeroSection() {
    return (
        <div className="p-6 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                    A Sustainable Solution to
                </h1>
                <h1 className="text-3xl mt-3 md:text-5xl font-bold text-gray-900">
                    <span className="text-primary flex justify-center items-center">
                        RePurpose
                    </span>
                </h1>
                <h1 className="text-3xl mt-3 md:text-5xl font-bold text-gray-900">
                    Old Clothes for a Better Planet
                </h1>
                <p className="text-gray-600 mt-8 text-sm md:text-lg">
                    RePurpose connects sellers and stores to promote the reuse of old clothes, reducing waste and saving the environment. Join us in making a sustainable impact today.
                </p>
                <div className="mt-10 flex justify-center space-x-4">
                    <Button className="px-6 py-6">Get Started</Button>
                    <Button className="px-6 py-6 border border-primary text-primary" variant={"outline"}>Learn More</Button>
                </div>
            </div>
        </div>
    );
}
