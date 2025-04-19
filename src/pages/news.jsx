import React, { useState } from "react";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

const blogs = [
  // Reordered array of blogs
  {
    image:
      "https://media.4-paws.org/7/3/9/c/739c5e83c7df21738cd28ff12bf471696fd29ab2/VIER%20PFOTEN_2024-04-17_00173-4179x2786-4026x2786-440x304.webp",
    title: "From Stray to Star Photo Exhibition",
    description:
      "A new chapter for Moldova's stray dogs as they take the limelight in an exhibition.",
    link: "https://www.four-paws.org/our-stories/blog-news/from-stray-to-star-photo-exhibition",
  },
  {
    image:
      "https://media.4-paws.org/d/e/4/e/de4e293d89561b4192d4200f7022f4f71b797b20/Fotolia_201076437_L-2890x2000-440x304.webp",
    title: "Nan Bray: The Compassionate Woolgrower",
    description:
      "A high welfare sheep farm free from live lamb cutting helping to chart a new course for Australian wool.",
    link: "https://www.four-paws.org/our-stories/blog-news/nan-bray-the-compassionate-woolgrower",
  },
  {
    image:
      "https://thepetbooklady.typepad.com/.a/6a00d8347a49a469e202c8d3d135ce200c-500wi",
    title: "The Best Time to Sell a Veterinary Practice and Why It Matters",
    description:
      "Insights into optimal timing for selling a veterinary practice and its implications.",
    link: "https://www.petbloglady.com/2025/04/the-best-time-to-sell-a-veterinary-practice-and-why-it-matters.html",
  },
  {
    image:
      "https://thepetbooklady.typepad.com/.a/6a00d8347a49a469e202c8d3d0e516200c-500wi",
    title: "If Your Pet Eats Something Toxic, Hold the Hydrogen Peroxide",
    description:
      "Guidance on handling situations when pets ingest toxic substances.",
    link: "https://www.petbloglady.com/2025/04/if-your-pet-eats-something-toxic-hold-the-hydrogen-peroxide.html",
  },
  {
    image:
      "https://media.4-paws.org/9/f/0/4/9f0484c765fdd1480d82d07806076a1b46ef2a8f/WAM12095-2598x1797-440x304.webp",
    title: "Love is in the Air",
    description:
      "Meet the happy rescued animal couples who call our sanctuaries home.",
    link: "https://www.four-paws.org/our-stories/blog-news/love-is-in-the-air",
  },
  {
    image:
      "https://media.4-paws.org/1/8/7/3/18734787534b271f715ae1c67b7d893f52421eff/VIER_PFOTEN_2021-06-30_00280%20%281%29-2890x2000-440x304.webp",
    title: "Farm Highlight: The future is non-mulesed",
    description:
      "How an Australian wool producing family successfully ended the painful practice of live lamb cutting (mulesing).",
    link: "https://www.four-paws.org/our-stories/blog-news/farm-highlight-the-future-is-non-mulesed",
  },
  {
    image:
      "https://media.4-paws.org/8/f/7/c/8f7cee95d2a3f465fe32e3e4618f1567148cb702/iStock-92015330-2592x1728-2497x1728-440x304.webp",
    title: "Behind the Scenes: Live Lamb Cutting Reaction Videos",
    description:
      "Working with Lamb Chop, Elizabeth Turner, and more Hollywood stars in LA to bring awareness for animal welfare.",
    link: "https://www.four-paws.org/our-stories/blog-news/behind-the-scenes-live-lamb-cutting-reaction-videos",
  },
  {
    image:
      "https://media.4-paws.org/8/b/b/6/8bb600a04e03d995264c874c77b95934a5f6212b/VIER%20PFOTEN_2024-10-09_0027-4356x3270-4356x3014-440x304.webp",
    title: "Sunrise Surveys: Mapping Cambodia’s Stray Dog Populations",
    description:
      "FOUR PAWS took to the streets of Siem Reap to gather data on the province’s stray dogs.",
    link: "https://www.four-paws.org/our-stories/blog-news/sunrise-surveys-mapping-cambodias-stray-dog-populations",
  },
];

export const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold mb-8 text-center myhead menufont">
          Our Blog
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{blog.description}</p>
                <button
                  onClick={() => window.open(blog.link, "_blank")}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              paginate(currentPage - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2"
          >
            Previous
          </button>
          <button
            onClick={() => {
              paginate(currentPage + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.location.href = "#";
            }}
            disabled={indexOfLastItem >= blogs.length}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
