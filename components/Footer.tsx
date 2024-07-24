import type { NextPage } from "next";
import styles from "@/styles/footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer: NextPage = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.title}>
        <div className={styles.figma} />
        <div className={styles.buttonList}>
          <Link href={"https://x.com/Neo_Blockchain"}>
            <Image
              className={styles.xLogoIcon}
              alt=""
              src="/XLogo.svg"
              width={24}
              height={24}
            />
          </Link>
          <Link href={"https://discord.gg/neosmarteconomy"}>
            <Image
              className={styles.logoDiscordIcon}
              alt=""
              src="/discord-mark-black.png"
              width={24}
              height={24}
            />
          </Link>
          <Link href={"Uhttps://t.me/NEO_EN"}>
            <Image
              className={styles.logoTelegramIcon}
              alt=""
              src="/LogoTelegram.svg"
              width={26}
              height={26}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
