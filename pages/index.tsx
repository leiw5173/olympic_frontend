import { FunctionComponent } from "react";
import Header from "../components/Header";
import styles from "../styles/index.module.css";
import PricingCard from "@/components/Card";
import Footer from "@/components/Footer";
import DepositCard from "@/components/DepositCard";
import { useState } from "react";
import { useReadContract } from "wagmi";
import { abi } from "@/libs/abi";
import { contractAddress } from "@/libs/address";

const Desktop: FunctionComponent = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const chunkedArray = [];

  const handleDepositClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setIsDepositOpen(true);
  const handleClose = () => setIsDepositOpen(false);

  const { data: eventCount } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getEventCount",
    args: [],
  });

  const numbers = Array.from(
    { length: Number(eventCount) - 1 },
    (_, i) => i + 1
  );
  for (let i = 0; i < numbers.length; i += 4) {
    const chunk = numbers.slice(i, i + 4);
    chunkedArray.push(chunk);
  }

  return (
    <div className={styles.desktop1}>
      <div className={styles.examplespricing}>
        <Header onOpen={handleDepositClick} />
        <DepositCard isOpen={isDepositOpen} onClose={handleClose} />

        <div className={styles.cardGridPricing}>
          {chunkedArray.map((chunk, index) => (
            <div className={styles.cardGrid} key={index}>
              {chunk.map((eventId) => (
                <div className={styles.pricingCard} key={eventId}>
                  <PricingCard eventId={eventId} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Desktop;
