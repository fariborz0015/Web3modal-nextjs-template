import BuyMeCoffee from "@/components/pages/index/BuyMeCoffee";
import WalletStatus from "@/components/pages/index/WalletStatus";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between   `}
    >
      <div className="w-full absolute h-screen -z-100 ">
        <Image
          src={"/assets/images/moons.webp"}
          className="Images_hollowplanets__NOFlf"
          width={1300}
          height={1300}
          alt=""
        />
        <Image
          src={"/assets/images/planet.svg"}
          className="Images_bigplanet__LgSiS"
          width={200}
          height={200}
          alt=""
        />
        <Image
          src={"/assets/images/planet.svg"}
          className="Images_smallplanet__JD3DP"
          width={200}
          height={200}
          alt=""
        />
      </div>
      <div className="container h-screen  relative z-100  mt-40 max-w-[700px] justify-center   ">
        <div className="  ">
          <h1 className="welcomeText">Fariborz Dapp</h1>
          <p className="font-bold mt-2">
            Hi ✌️, Welcome to my Dapp
            <span className="mt-2 block text-gray-200 font-light">
              {" "}
              this web app developed with Web3Modal , so you can by me a coffee
              by your crypto currency
            </span>
          </p>
          <Button variant={"glass"} className="mt-4 gap-4">
            <Icon icon={"akar-icons:github-outline-fill"} className="size-6" />
            This Project on Github
          </Button>
        </div>
        <div className="mt-4  ">
          <WalletStatus />
        </div>
        <div className="   mt-8">
          <BuyMeCoffee />
        </div>
      </div>
    </main>
  );
}
