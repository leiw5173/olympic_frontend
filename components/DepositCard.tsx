import type { NextPage } from "next";
import styles from "@/styles/depositCard.module.css";
import Image from "next/image";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { getAccount } from "wagmi/actions";
import { abi } from "@/libs/abi";
import { parseEther } from "viem";
import { config } from "@/libs/config";
import { contractAddress } from "@/libs/address";

interface DepositCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositCard: NextPage<DepositCardProps> = ({ isOpen, onClose }) => {
  let showButton = true;
  const account = getAccount(config);

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { data: balance } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getBalance",
    args: [account.address || "0x0"],
  });

  async function submit() {
    writeContract({
      abi,
      address: contractAddress,
      functionName: "payEntryFee",
      args: [],
      value: parseEther("10"), // 10 GAS
    });
  }

  const { isSuccess: isConfirmed, isLoading } = useWaitForTransactionReceipt({
    hash,
  });
  if (isConfirmed) showButton = false;
  if (balance == parseEther("10")) showButton = false;
  if (error) alert(`Error: ${error.message}`);

  if (!isOpen) return null;

  return (
    <div className={styles.cardParent}>
      <div className={styles.card}>
        <Image
          className={styles.infoIcon}
          alt=""
          src="/info.svg"
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
          {showButton ? (
            <div className={styles.buttonGroup}>
              <div className={styles.button}>
                <button
                  className={styles.button1}
                  onClick={submit}
                  disabled={isPending || isLoading}
                >
                  {isPending || isLoading ? "Depositting" : "Deposit"}
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.bodyTextFor}>
              You have successfully deposited!
            </div>
          )}
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
