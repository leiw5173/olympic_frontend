import type { NextPage } from "next";
import styles from "../styles/card.module.css";
import Image from "next/image";
import Dropdown from "./Dropdown";

const options = [
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "italy", label: "Italy" },
];

const PricingCard: NextPage = () => {
  const handleSelect = (value: string) => {
    console.log(`Selected value: ${value}`);
  };

  return (
    <div className={styles.pricingCard}>
      <div className={styles.button}>
        <div className={styles.select}>Select</div>
      </div>
      <div className={styles.header}>
        <div className={styles.price}>
          <b className={styles.b}>10</b>
          <b className={styles.b}>GAS</b>
        </div>
      </div>
      <div className={styles.whichCountryIsTheWinnerParent}>
        <div className={styles.whichCountryIs}>
          Which country is the winner?
        </div>
        <div className={styles.dueIn24h}>Due in 24h</div>
      </div>
      <div className={styles.accordionItemWrapper}>
        <Dropdown options={options} onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default PricingCard;
