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
    title: "Bridging the Gap Between Sellers and Stores",
    description: "RePurpose provides a streamlined platform where individuals can easily donate unused items with stores or directly with users, ensuring these goods find meaningful purposes.",
    icon: "🤝",
  },
  {
    title: "Reducing Waste Through Extended Resource Utilization",
    description: "By channeling unused items into a shared system, RePurpose minimizes waste, reducing the strain on the environment and contributing to a circular economy.",
    icon: "♻️",
  },
  {
    title: "Encouraging Participation Through Rewards",
    description: "The platform incentivizes individuals to contribute by offering a point-based rewards system, fostering sustained engagement and a culture of giving.",
    icon: "🎁",
  },
  {
    title: "Streamlining Logistics with Intelligent Features",
    description: "RePurpose simplifies the interaction between donors, stores, and potential users, making the process efficient and user-friendly.",
    icon: "📦",
  },
  
];

// Question
const faqItems = [
  { 
    question: "Who can join the platform?", 
    answer: "Anyone who wishes to contribute to sustainability by donating, selling, or purchasing old clothes can join RePurpose. Whether you're an individual seller or a store, the platform is open to all." 
  },
  { 
    question: "On what basis does a seller get reward points?", 
    answer: "Sellers earn reward points based on the quantity and quality of items they donate or sell. Points are also influenced by demand for the items and positive feedback from buyers." 
  },
  { 
    question: "What is the minimum reward that can be redeemed?", 
    answer: "The minimum reward points required for redemption is 1000. Points can be redeemed for discounts, gift cards, or other perks available on the platform." 
  },
  { 
    question: "What is the criteria to become a seller?", 
    answer: "To become a seller, you must create an account, verify your identity, and list items that meet the platform's quality and usability standards." 
  },
  { 
    question: "What is the criteria to become a store?", 
    answer: "Stores must register with a valid business license, agree to the platform's sustainability guidelines, and commit to purchasing or accepting items from sellers." 
  },
  
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
            subtitle="Discover the most sought-after items helping to promote sustainability and reduce waste."
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