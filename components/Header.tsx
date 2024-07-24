import type { NextPage } from "next";
import styles from "../styles/header.module.css";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { contractAddress } from "@/libs/address";
import { abi } from "@/libs/abi";
import { parseEther } from "viem";
import Alarm from "./Alarm";

interface DepositCardProps {
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: NextPage<DepositCardProps> = ({ onOpen }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  let deposited = false;
  const { address } = useAccount();

  const [visibe, setVisibe] = useState(false);

  const showAlarm = () => setVisibe(true);
  const hideAlarm = () => setVisibe(false);

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getBalance",
    args: [address || "0x0"],
  });
  if (balance == parseEther("10")) deposited = true;

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (address) setIsButtonDisabled(false);
  }, [address]);

  async function submit() {
    writeContract({
      abi,
      address: contractAddress,
      functionName: "withdrawFunds",
      args: [],
    });
  }

  if (error) alert(`Error: ${error.message}`);

  return (
    <div className={styles.header}>
      <div className={styles.block}>
        <Image alt="" src="/neox.png" width={40} height={40} />
      </div>
      <div className={styles.headerAuth}>
        <Alarm visible={visibe} />
        {deposited ? (
          <div
            className={styles.button}
            onMouseEnter={showAlarm}
            onMouseLeave={hideAlarm}
          >
            <button
              className={styles.button1}
              onClick={submit}
              disabled={isPending}
            >
              {isConfirmed ? "Withdraw Successfully" : "Withdraw"}
            </button>
          </div>
        ) : (
          <div
            className={styles.button}
            onMouseEnter={showAlarm}
            onMouseLeave={hideAlarm}
          >
            <button
              className={styles.button1}
              onClick={onOpen}
              disabled={isButtonDisabled || deposited}
            >
              Deposite
            </button>
          </div>
        )}

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
