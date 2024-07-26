import { abi } from "@/libs/abi";
import { contractAddress } from "@/libs/address";
import type { Event } from "@/libs/definitions";
import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/card.module.css";
import { parseEther } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { writeContract } from "viem/actions";

export default function Page() {
  const [prize, setPrize] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<string>("");

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddItems = () => {
    const newItems = inputValue
      .split(/[\s,]+/) // Split by whitespace and comma
      .filter((item) => item.trim() !== ""); // Remove empty strings

    setList([...list, ...newItems]);
    setInputValue("");
  };

  return (
    <div className={styles.title}>
      <ConnectButton />
      <div className={styles.chevronDownIcon}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            writeContract({
              abi,
              address: contractAddress,
              functionName: "createEvent",
              args: [parseEther(prize), question, list, BigInt(deadline)],
              value: parseEther(prize),
            });
          }}
        >
          <label>
            Prize:
            <input
              type="text"
              name="prize"
              onChange={(e) => {
                setPrize(e.target.value);
              }}
              value={prize}
            />
          </label>
          <label>
            Question:
            <input
              type="text"
              name="question"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              value={question}
            />
          </label>

          <label>
            Deadline
            <input
              type="text"
              name="deadline"
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
              value={deadline}
            />
          </label>
          <button className={styles.button} disabled={isPending}>
            Set Winner
          </button>
        </form>
        <label>
          Counntries:
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter items separated by commas or spaces"
          />
          <button onClick={handleAddItems}>Add Items</button>
        </label>
        <div>
          <h2>Countries: </h2>
          <ul>
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {isConfirmed && <p>Winner set successfully!</p>}
      {error && <p>Error: {error.message}</p>}
      <Link href={"/"}>
        <button className={styles.button}>BACK</button>
      </Link>
    </div>
  );
}
