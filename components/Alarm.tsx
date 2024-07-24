import type { NextPage } from "next";
import styles from "@/styles/alarm.module.css";
import Image from "next/image";
import { useReadContract, useAccount } from "wagmi";
import { contractAddress } from "@/libs/address";
import { abi } from "@/libs/abi";
import { parseEther } from "viem";

interface AlarmProps {
  visible: boolean;
}

const Alarm: NextPage<AlarmProps> = ({ visible }) => {
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getBalance",
    args: [address || "0x0"],
  });

  if (!visible) {
    return null;
  }

  if (balance == parseEther("10"))
    return (
      <div className={styles.pleaseWaitForTheEndOfOlyParent}>
        <div className={styles.pleaseWaitFor}>
          Please wait for the end of Olympic Games to withdraw your deposit.
        </div>
        <Image
          className={styles.alertCircleIcon}
          alt=""
          src="/alert-circle.svg"
          width={17}
          height={17}
        />
      </div>
    );

  if (balance != parseEther("10"))
    return (
      <div className={styles.pleaseWaitForTheEndOfOlyParent}>
        <div className={styles.pleaseWaitFor}>
          You need to deposit 10 GAS to start the game.
        </div>
        <Image
          className={styles.alertCircleIcon}
          alt=""
          src="/alert-circle.svg"
          width={17}
          height={17}
        />
      </div>
    );
};

export default Alarm;
