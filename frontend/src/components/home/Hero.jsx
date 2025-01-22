import { Link } from "react-router";
import { Carousel } from "antd";

const Hero = () => {
  return (
    <div className="max-w-[1000px] mx-auto py-24 text-center px-4">
      <h1 className="text-3xl lg:text-7xl text-green-800 capitalize mb-4">
        Fresh Produce directly from the farm 24hr/7d
      </h1>
      <p className="max-w-[500px] mx-auto font-light text-lg text-gray-700 mb-4">
        Bringing you the freshest harvest, handpicked directly from local farm
        and delivered to your doorstep.
      </p>
      <section className="flex relative flex-col-reverse lg:flex-row items-center justify-center gap-8">
        <div className="w-full lg:w-[80%]">
          <Carousel autoplay>
            <div>
              <img
                className="w-[500px] mx-auto"
                src="/hero.png"
                alt="market illustration"
              />{" "}
            </div>
            <div>
              <img
                className="w-[500px] mx-auto"
                src="/eco.png"
                alt="market illustration"
              />{" "}
            </div>
            <div>
              <img
                className="w-[500px] mx-auto"
                src="/bro.png"
                alt="market illustration"
              />{" "}
            </div>
            <div>
              <img
                className="w-[500px] mx-auto"
                src="/fruit.png"
                alt="market illustration"
              />{" "}
            </div>
          </Carousel>
        </div>
        <div className="w-full md:hidden ">
          <Link to={"/marketplace"}>
            <button className="bg-green-700 px-7 py-2 animate-pulse font-semibold rounded-lg text-white">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="w-full hidden md:block lg:w-[20%] absolute md:-top-2 md:right-2">
          <Link to={"/marketplace"}>
            <button className="bg-green-600 md:bg-green-700 px-7 py-2 animate-pulse font-semibold rounded-lg text-white">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
