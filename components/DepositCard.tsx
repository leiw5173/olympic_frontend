import type { NextPage } from "next";
import styles from "@/styles/depositCard.module.css";
import Image from "next/image";

interface DepositCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositCard: NextPage<DepositCardProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.cardParent}>
      <div className={styles.card}>
        <Image
          className={styles.infoIcon}
          alt=""
          src="Info.svg"
          width={34}
          height={34}
        />
        <div className={styles.body}>
          <div className={styles.text}>
            <div className={styles.title}>Deposit GAS</div>
            <div className={styles.bodyTextFor}>
              If you want to participate in this game, you need to deposit 10
              GAS. Please note, you will be allowed to withdraw your GAS after
              2024/08/12 23:59:59 UTC.
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <div className={styles.button}>
              <button className={styles.button1}>Deposit</button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onClose}>
        <Image
          className={styles.xCircleIcon}
          alt=""
          src="/x-circle.svg"
          width={100}
          height={100}
        />
      </button>
    </div>
  );
};

export default DepositCard;
