import Image from "next/image";
import Navbar from "../components/ui/Navbar";
import Items from "../components/ui/Items";
import { Button } from "../components/ui/Button";
import ImageCard from "../components/ui/ImageCard";
import TitleSection from "../components/ui/TitleSection";
import Gallary from "../components/ui/Gallary";
import Footer from "../components/ui/Footer";
import HeroSection from "@/components/ui/HeroSection";
import FeatureCard from "@/components/ui/FeatureCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



const features = [
  {
    title: "Enjoy on your TV",
    description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    icon: "📺",
  },
  {
    title: "Download your shows to watch offline",
    description: "Save your favorites easily and always have something to watch.",
    icon: "⬇️",
  },
  {
    title: "Watch everywhere",
    description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    icon: "📱",
  },
  {
    title: "Create profiles for kids",
    description: "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
    icon: "👶",
  },
];

// Question
const faqItems = [
  { question: "What is Netflix?", answer: "Netflix is a streaming service offering a wide variety of TV shows, movies, anime, documentaries, and more." },
  { question: "How much does Netflix cost?", answer: "Plans range from USD 8.99 to USD 17.99 a month. No extra costs, no contracts." },
  { question: "Where can I watch?", answer: "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your account to watch instantly on the web." },
  { question: "How do I cancel?", answer: "Cancel anytime online in two clicks. There are no cancellation fees – start or stop your account at any time." },
  { question: "What can I watch on Netflix?", answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more." },
  { question: "Is Netflix good for kids?", answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies." },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <div>
      <HeroSection />
      </div>

      
    
      {/* product section */}
      <div className="px-6 md:px-8 py-3 md:py-3">
        <div className="font-[family-name:var(--font-geist-sans)]">
          <TitleSection
            title="Trending Products"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            variant="left"
          />

          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 items-center justify-items-center">
            <Items
              imageUrl="/assets/bg.png" // Ensure this path is correct and the image is in the public directory
              name="Sample Product"
              // 20% discount
            />
            <Items
              imageUrl="/assets/bg.png" // Ensure this path is correct and the image is in the public directory
              name="Sample Product"
              
            />
          </main>
        </div>
      </div>

     {/* Why to choose us */}

      <div className="px-10 md:px-12 py-3 md:py-3">
        <TitleSection
          title="More Reasons to Join"
          subtitle=""
          variant="left"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>

          {/* FAQ section */}
         {/* FAQ section */}
<div className="px-8 md:px-8 py-3 md:py-3 border-primary">
  <TitleSection
    title="Frequently Asked Questions"
    subtitle=""
    variant="left"
  />
  <Accordion type="single" collapsible className="w-full max-w-4xl">
    {faqItems.map((item, index) => (
      <AccordionItem key={index} value={`item-${index}`} className="border-primary">
        <AccordionTrigger className=" px-6 py-4 text-2xl">{item.question}</AccordionTrigger>
        <AccordionContent className="text-primary px-6 py-4 text-xl">{item.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</div>


      <Gallary />
      <Footer />
    </div>
  );
}