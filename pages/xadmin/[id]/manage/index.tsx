import { abi } from "@/libs/abi";
import { contractAddress } from "@/libs/address";
import type { Event } from "@/libs/definitions";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/card.module.css";
import { formatEther } from "viem";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Page() {
  const id = useRouter().query.id;
  let event: Event;
  let options: { value: string; label: string }[] = [];
  const [selectWinner, setSelectWinner] = useState("");

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const { data } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "getE",
    args: [BigInt(Number(id))],
  });

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

  const handleSelect = (value: string) => {
    setSelectWinner(value);
  };

  const submit = () => {
    writeContract({
      abi,
      address: contractAddress,
      functionName: "setEventWinners",
      args: [BigInt(event.eventId), selectWinner],
    });
  };

  // Calculate Due time
  const now = Math.floor(Date.now() / 1000);
  const differenceInSecs = Number(event.deadline) - now;
  const hours = Math.floor(differenceInSecs / 3600);
  const minutes = Math.floor((differenceInSecs % 3600) / 60);

  return (
    <div className={styles.title}>
      <ConnectButton />
      <div className={styles.chevronDownIcon}>
        <h1>Event {event.eventId}</h1>
        <p>Prize: {formatEther(event.prize)} GAS</p>
        <p>Question: {event.question}</p>
        <p>
          Deadline: Remain {hours}h {minutes}m
        </p>
        <p>Participants: {event.participants}</p>
        <p>Winners: {event.winners}</p>
      </div>
      <div className={styles.accordionItemWrapper}>
        <Dropdown options={options} onSelect={handleSelect} />
      </div>
      <button className={styles.button} onClick={submit} disabled={isPending}>
        Set Winner
      </button>
      {isConfirmed && <p>Winner set successfully!</p>}
      {error && <p>Error: {error.message}</p>}
      <Link href={"/"}>
        <button className={styles.button}>BACK</button>
      </Link>
    </div>
  );
}
