import { FunctionComponent } from "react";
import Header from "../components/Header";
import styles from "../styles/index.module.css";
import PricingCard from "@/components/Card";
import Footer from "@/components/Footer";
import DepositCard from "@/components/DepositCard";
import { useState } from "react";

const Desktop: FunctionComponent = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  const handleDepositClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setIsDepositOpen(true);
  const handleClose = () => setIsDepositOpen(false);

  return (
    <div className={styles.desktop1}>
      <div className={styles.examplespricing}>
        <Header onOpen={handleDepositClick} />
        <DepositCard isOpen={isDepositOpen} onClose={handleClose} />
        <div className={styles.cardGridPricing}>
          <div className={styles.cardGrid}>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
          </div>
          <div className={styles.cardGrid}>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
          </div>
          <div className={styles.cardGrid}>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
            <div className={styles.pricingCard}>
              <PricingCard eventId={1} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Desktop;
