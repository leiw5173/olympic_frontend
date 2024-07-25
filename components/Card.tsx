import type { NextPage } from "next";
import styles from "../styles/card.module.css";
import Dropdown from "./Dropdown";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { contractAddress } from "@/libs/address";
import { abi } from "@/libs/abi";
import { formatEther, parseEther } from "viem";
import { Event } from "@/libs/definitions";
import { useRouter } from "next/router";

interface PricingCardProps {
  eventId: number;
}

const PricingCard: NextPage<PricingCardProps> = ({ eventId }) => {
  const router = useRouter();
  let win = false;
  let event: Event;
  let options: { value: string; label: string }[] = [];
  let disableButton = false;
  const { address } = useAccount();
  const { data } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getE",
    args: [BigInt(eventId)],
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const { data: bet } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getBet",
    args: [address || "0x0", BigInt(eventId)],
  });

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getBalance",
    args: [address || "0x0"],
  });

  if (balance != parseEther("10") || !address || isPending || bet?.isPlaced)
    disableButton = true;

  if (!data) {
    console.log("No data available");
    return <div>Loading...</div>;
  } else {
    event = {
      eventId: Number(data[0]),
      prize: data[1],
      question: data[2],
      countries: data[3],
      deadline: data[4],
      participants: data[5],
      winners: data[6],
      status: data[7],
    };
  }

  for (let i in event.countries) {
    options.push({ value: event.countries[i], label: event.countries[i] });
  }

  // Calculate Due time
  const now = Math.floor(Date.now() / 1000);
  const differenceInSecs = Number(event.deadline) - now;
  const hours = Math.floor(differenceInSecs / 3600);
  const minutes = Math.floor((differenceInSecs % 3600) / 60);

  const handleSelect = (value: string) => {
    writeContract({
      abi,
      address: contractAddress,
      functionName: "placeBet",
      args: [BigInt(eventId), value],
    });
  };

  if (error) alert(`Error: ${error.message}`);
  if (isConfirmed) {
    alert("Your bet was placed!");
    router.reload();
  }

  if (address && event.winners.includes(address)) win = true;

  return (
    <div className={styles.pricingCard}>
      <div className={styles.header}>
        <div className={styles.price}>
          <b className={styles.b}>{formatEther(event?.prize)}</b>
          <b className={styles.b}>GAS</b>
        </div>
      </div>
      <div className={styles.whichCountryIsTheWinnerParent}>
        <div className={styles.whichCountryIs}>{event?.question}</div>
        <div className={styles.dueIn24h}>
          {differenceInSecs >= 0 && `Due in ${hours}h ${minutes}m`}
          {differenceInSecs < 0 && "Expired"}
        </div>
      </div>
      <div className={styles.accordionItemWrapper}>
        {bet ? (
          <div className={styles.accordionTitle}>
            Your pridiction is: {bet.prediction}
          </div>
        ) : (
          <Dropdown options={options} onSelect={handleSelect} />
        )}
      </div>
      <div className={styles.button}>
        <button className={styles.select} disabled={disableButton}>
          {!bet?.isPlaced && event.status == 0 && "Select"}
          {bet?.isPlaced && event.status == 0 && "Placed"}
          {win && event.status == 2 && "You Won!"}
          {!win && event.status == 2 && "You Lost!"}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
