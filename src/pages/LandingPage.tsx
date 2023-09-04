import { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { SIGNUP } from "../utilities/routes";
import { useNavigate } from "react-router-dom";
import { AiTwotoneStar, AiFillGithub } from "react-icons/ai";
import { HiOutlineDocumentAdd, HiSearch, HiChatAlt } from "react-icons/hi";
import { FaRegHandshake } from "react-icons/fa";
import { SiNetlify } from "react-icons/si";
import Ecommerce from "../assets/Ecommerce.svg";
import { TwitterTweetEmbed } from "react-twitter-embed";

const LandingPage = () => {
  const navigate = useNavigate();
  const [githubRepo, setGithubRepo] = useState({
    stargazers_count: 0,
    followers: 0,
  } as {
    stargazers_count: number;
    followers: number;
  });
  const [githubContributors, setGithubContributors] = useState(
    [] as {
      id: number;
      login: string;
      avatar_url: string;
      html_url: string;
    }[]
  );
  const featureRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  const campusReuseHubFeatures = [
    {
      name: "Easy Item Listing",
      description:
        "List your reusable items effortlessly . Share items with fellow students and contribute to sustainability.",
      icon: HiOutlineDocumentAdd,
    },
    {
      name: "Discover Hidden Treasures",
      description:
        "Explore a variety of items that others are offering for reuse. Find useful things for your needs while promoting a culture of sharing.",
      icon: HiSearch,
    },
    {
      name: "Safe and Eco-Friendly Transactions",
      description:
        "Connect with other students to exchange items within a secure and environmentally friendly environment. Promote sustainable living.",
      icon: FaRegHandshake,
    },
    {
      name: "Chat with Seller and Buyer",
      description:
        "Communicate directly with the seller or buyer of an item through a built-in chat system. Discuss item details, negotiate prices, and arrange meetups.",
      icon: HiChatAlt,
    },
  ];

  const tweets = [
    { id: "1694722170373763401" },
    { id: "1695395318295400527" },
    { id: "1694701496871616766" },
    { id: "1694748693134717251" },
  ];

  // to fetch github repo details

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 1000);
    fetch("https://api.github.com/repos/Manikanta528/CampusReuseHub")
      .then((response) => response.json())
      .then((data) => {
        setGithubRepo((prev) => ({
          ...prev,
          stargazers_count: data.stargazers_count,
        }));
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/Manikanta528")
      .then((response) => response.json())
      .then((data) => {
        setGithubRepo((prev) => ({
          ...prev,
          followers: data.followers,
        }));
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/Manikanta528/CampusReuseHub/contributors"
    )
      .then((response) => response.json())
      .then((data) => {
        setGithubContributors(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="bg-white">
        <NavBar isHomePage={true} />
        <main className="relative isolate bg-white opacity-80 bg-background-pattern bg-26 h-screen">
          <div className="flex gap-4 px-12 pt-12 justify-center sm:justify-end ">
            <div className="bg-white flex group " data-aos="flip-up">
              <a
                href={"https://github.com/Manikanta528/CampusReuseHub"}
                target="_blank"
                className="flex items-center text-xs gap-2 px-2 py-[6px] border-l-[2px] border-y-[2px] border-black bg-white text-black rounded-l  group-hover:shadow-xl group-hover:text-white group-hover:bg-black"
              >
                <AiTwotoneStar size={"16px"} color={"gold"} />
                <span>Star</span>
              </a>
              <a
                href={"https://github.com/Manikanta528/CampusReuseHub"}
                target="_blank"
                className="flex items-center py-[6px] text-xs px-2 border-y-[2px] border-x-[2px] border-black rounded-r bg-black text-white "
              >
                <span>{githubRepo.stargazers_count}</span>
              </a>
            </div>
            <div className="bg-white flex rounded group" data-aos="flip-up">
              <a
                href={"https://github.com/Manikanta528/"}
                target="_blank"
                className="flex items-center text-xs gap-2 px-2 py-[6px] border-l-[2px] border-y-[2px] border-black bg-white text-black rounded-l  group-hover:shadow-xl group-hover:text-white group-hover:bg-black"
              >
                <AiFillGithub
                  size={"16px"}
                  className="group-hover:text-white"
                />
                <span>Follow</span>
              </a>
              <a
                href={"https://github.com/Manikanta528/"}
                target="_blank"
                className="flex items-center py-[6px] text-xs px-2 border-y-[2px] border-x-[2px] border-black rounded-r bg-black text-white "
              >
                <span>{githubRepo.followers}</span>
              </a>
            </div>
          </div>
          <div>
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div className="flex text-center md:text-left w-screen flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 lg:gap-32 px-12">
            <div className="w-[60%] h-full hidden md:block">
              <img
                src={Ecommerce}
                alt="Hero image"
                className="w-full h-full"
                data-aos="fade-right"
                data-aos-duration="3000"
              />
            </div>
            <div className="w-full md:w-[40%] flex flex-col h-full pt-12 md:pt-12 lg:pt-2">
              <div
                id="title"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-5xl lg:text-6xl leading-10"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                <span>
                  Your{" "}
                  <span className="text-bold text-indigo-600">College</span>{" "}
                  Essentials Marketplace
                </span>
              </div>
              <p
                className="mt-6 text-base sm:text-2xl md:text-base leading-8 text-gray-600"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                Buy, sell, and chat with fellow students for textbooks,
                stationery, and more within your campus community and beyond.
              </p>
              <div className="mt-10 flex flex-col gap-24 items-center md:items-start justify-center gap-x-6">
                <button
                  onClick={() => {
                    navigate(SIGNUP);
                  }}
                  className="rounded-md bg-gradient-to-b from-indigo-300 to-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shadow-lg hover:shadow-indigo-600/40 active:bg-gradient-to-bl active:from-indigo-300 active:to-indigo-600"
                  data-aos="fade-up"
                  data-aos-duration="2500"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
          <div className="w-screen flex justify-center py-12 h-10">
            {load && (
              <div
                className=" top-24  animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-indigo-600/5 dark:ring-primary/20 shadow-lg rounded-full sm:flex items-center justify-center cursor-pointer"
                onClick={() => {
                  if (featureRef.current)
                    featureRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            )}
          </div>
        </main>
        <section className="bg-white py-24 sm:py-32" ref={featureRef}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2
                className="text-2xl font-semibold leading-7 text-indigo-600"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                Features
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything about Campus Reuse Hub
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                It is designed to help you Student communities to reuse items
                and promote sustainability.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {campusReuseHubFeatures.map((feature, i) => {
                  const duration = i * 500;
                  return (
                    <div key={feature.name} className="relative pl-16">
                      <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div
                          className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-b from-indigo-300 to-indigo-600 shadow-lg shadow-indigo-600/40"
                          data-aos="flip-right"
                          data-aos-duration={duration}
                        >
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </div>
                      </dt>
                      <dd
                        className="text-base font-semibold leading-7 text-indigo-600"
                        data-aos="fade-left"
                        data-aos-duration={duration - 500}
                      >
                        {feature.name}
                      </dd>
                      <dd
                        className="mt-2 text-base leading-7 text-gray-600"
                        data-aos="fade-up"
                        data-aos-duration={duration}
                      >
                        {feature.description}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </section>
        <section className="bg-white opacity-80 bg-background-pattern-1 bg-26 h-fit">
          <section className=" py-24 sm:py-32">
            <div className=" max-w-7xl px-2 lg:px-4">
              <div className="flex flex-col justify-center items-center w-screen sm:px-12 lg:text-center">
                <h2
                  className="text-2xl font-semibold text-center leading-7 text-indigo-600 bg-white m-12"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                >
                  Testimonials
                </h2>

                <div className=" w-full inline-flex flex-nowrap overflow-hidden [mask-image:none] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-256px),transparent_100%)]">
                  <ul className=" flex items-start justify-start  [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                    {tweets.map((tweet, index) => (
                      <li key={index} className=" text-gray-600 cursor-pointer testimonialItem">
                        <TwitterTweetEmbed
                          onLoad={function noRefCheck() {}}
                          placeholder={`Loading tweet ${tweet.id}...`}
                          tweetId={tweet.id}  
                        />
                      </li>
                    ))}
                  </ul>
                  <ul className="flex items-start justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                    {tweets.map((tweet, index) => (
                      <li key={index} className=" text-gray-600 cursor-pointer testimonialItem" >
                        <TwitterTweetEmbed
                          onLoad={function noRefCheck() {}}
                          tweetId={tweet.id}
                          placeholder={`Loading tweet ${tweet.id}...`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className="bg-indigo-600 h-full pt-12">
          <div className="mx-auto max-w-7xl px-6 h-32">
            <div className="mx-auto my-0 max-w-2xl sm:text-center">
              <h2 className="mt-2 text-3xl font-bold  text-white">
                Contributors
              </h2>
              <div className="mx-auto mt-6 max-w-2xl sm:mt-6 lg:mt-6 lg:max-w-4xl">
                <dl className="flex flex-wrap gap-4 justify-start sm:justify-center">
                  {githubContributors.map((contributor) => (
                    <div key={contributor.id} className="relative pl-16 group">
                      <dt className="text-base font-semibold leading-7 text-white">
                        <a
                          href={contributor.html_url}
                          target="_blank"
                          className="absolute left-0 top-0 flex h-fit w-fit items-center justify-center rounded-lg bg-indigo-600"
                        >
                          <img
                            className="text-white rounded-xl group-hover:rotate-12 group-hover:scale-110 transform transition-all duration-500 ease-in-out "
                            src={contributor.avatar_url}
                            alt={contributor.login}
                          />
                        </a>
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          <footer className="text-black px-6 pt-12 flex justify-start sm:justify-center items-center gap-4">
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className=" underline cursor-pointer"
            >
              <button className="bg-white  px-4 py-2 rounded-md">
                {" "}
                Deployed By <SiNetlify className="inline text-[#20c6b7]" />{" "}
                Netlify{" "}
              </button>
            </a>
          </footer>
          <p className="text-gray-300 text-center py-8">
            Credits: Hero Illustration from <a href="https://www.drawkit.com/" className="text-yellow-400 underline">drawkit</a>
          </p>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
