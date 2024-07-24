import type { NextPage } from "next";
import styles from "../styles/header.module.css";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

interface DepositCardProps {
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: NextPage<DepositCardProps> = ({ onOpen }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { address } = useAccount();

  useEffect(() => {
    if (address) setIsButtonDisabled(false);
  }, [address]);

  return (
    <div className={styles.header}>
      <div className={styles.block}>
        <Image alt="" src="/neox.png" width={40} height={40} />
      </div>
      <div className={styles.headerAuth}>
        <div className={styles.button}>
          <button
            className={styles.button1}
            onClick={onOpen}
            disabled={isButtonDisabled}
          >
            Deposit
          </button>
        </div>
        <div className={styles.button2}>
          <div className={styles.button1}>
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
