// components/FeatureCard.js
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-primary rounded-lg shadow-md">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    );
  }
  