import BuyMeCoffee from "@/components/pages/index/BuyMeCoffee";
import BuyMeCoffeeByContract from "@/components/pages/index/BuyMeCoffeeByContract";
import WalletStatus from "@/components/pages/index/WalletStatus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full z-50 h-14 sticky top-4 mt-4 backdrop-blur-sm bg-gray-700/20 rounded-lg container mx-auto flex items-center gap-4">
        <Link href={"#"}>
          <Image
            src="/assets/images/logo.svg"
            width={120}
            height={40}
            alt="fariborzamm"
            className="filter  invert "
          />
        </Link>
        <div className=" flex-1 flex items-center h-full gap-4">
          <Button
            variant={"ghost-glass"}
            icon={{
              icon: "line-md:account",
            }}
            arrowMode
            underLineMode={{
              className: "gradient-animation",
            }}
          >
            Buy Coffee
          </Button>
          <Button
            variant={"ghost-glass"}
            icon={{
              icon: "line-md:account",
            }}
            arrowMode
            underLineMode={{
              className: "gradient-animation",
            }}
          >
            Buy Coffee
          </Button>
        </div>
        <div>
          <Button
            key={"s"}
            variant={"ghost-glass"}
            icon={{
              icon: "line-md:document",
            }}
            arrowMode
            arrowIcon={{
              icon: "line-md:download-outline",
            }}
          >
            My Resume
          </Button>
        </div>
      </div>

      <div
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
          <div className="planet">
            <Image
              src={"/assets/images/planet.svg"}
              className="Images_bigplanet__LgSiS"
              width={200}
              height={200}
              alt=""
            />
          </div>
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
                this web app developed with Web3Modal , so you can by me a
                coffee by your crypto currency
              </span>
            </p>
            <Button variant={"glass"} className="mt-4 gap-4">
              <Icon
                icon={"akar-icons:github-outline-fill"}
                className="size-6"
              />
              This Project on Github
            </Button>
          </div>
          <div className="mt-4  ">
            <WalletStatus />
          </div>
          <Tabs defaultValue="matic" className=" mt-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="matic">MATIC</TabsTrigger>
              <TabsTrigger value="contract">PME Contract</TabsTrigger>
            </TabsList>
            <TabsContent value="matic">
              <div className="mt-4  ">
                <BuyMeCoffee />
              </div>
            </TabsContent>
            <TabsContent value="contract">
              <div className="   mt-8">
                <BuyMeCoffeeByContract />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
