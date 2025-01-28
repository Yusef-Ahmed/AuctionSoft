import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import diamond from "../../assets/diamond.png";
import art from "../../assets/art.png";
import rolex from "../../assets/rolex.png";
import car from "../../assets/car.png";
import { Floating } from "../components/Floating";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [diamond, rolex, car, art];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div className="w-4/7 my-auto mt-30 ml-5">
          <h1 className="text-6xl font-black tracking-tight">
            Your Ultimate Destination to Win, and Save Big!
          </h1>
          <p className="max-w-2xl mt-8 text-lg leading-8 text-slate-300">
            Experience the thrill of auctions! Explore unique items, bid
            confidently, and enjoy incredible savings. From rare finds to
            everyday treasures, our secure platform makes buying and selling
            easy. Start bidding today!
          </p>
          <div className="mt-8 flex items-center gap-x-6">
            <Link
              to="auctions"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Take a look
            </Link>
            <Link
              id="shadow"
              to="products"
              className="text-sm font-semibold leading-6 text-slate-300"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="flex w-1/2 justify-center">
          <Floating>
            <div className="mt-20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  className="h-96"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 1 }}
                />
              </AnimatePresence>
            </div>
          </Floating>
        </div>
      </div>
    </>
  );
}

export default Home;
