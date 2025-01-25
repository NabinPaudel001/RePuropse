import Image from "next/image";

interface IconsProps {
  type: "verified" | string; // You can replace `string` with more specific types if needed
}

const Icons: React.FC<IconsProps> = ({ type }) => {
  let url: string = "";
  let ht: number = 0;
  let wt: number = 0;

  if (type === "verified") {
    url = "/icons/verified.png";
    ht = 20;
    wt = 20;
  }

  return (
    <div className="relative h-6 w-6 flex items-center justify-center">
      {url && (
        <Image src={url} alt={type} height={ht} width={wt} />
      )}
    </div>
  );
};

export default Icons;
