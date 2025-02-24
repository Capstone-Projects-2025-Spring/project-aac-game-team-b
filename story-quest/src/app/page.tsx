import Image from "next/image";
import HomePageAnimatedTitle from '@/app/HomePage/HomePageAnimatedTitle';
import AnimatedButton from "@/app/HomePage/HomePageAnimatedButtons";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        style={{ backgroundImage: "url('/Background.jpg')",
        backgroundSize: "cover",
    }}>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start flex-grow">
        <div>
          <HomePageAnimatedTitle/>
        </div>


      <div className="button-container">
         <div>
          <AnimatedButton/>
         </div>
      </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">


      </footer>
    </div>
  );
}
