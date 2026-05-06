import { useState } from "react";

const BLOGS = [
  {
    id: 1,
    title: "Best Skincare Products for Healthy Glowing Skin in 2026",
    category: "Skincare",
    date: "March 20, 2026",
    readTime: "4 min read",
    excerpt:
      "Looking to upgrade your skincare routine? Discover the best cleansers, moisturizers, and serums for healthy, glowing skin. Perfect for all skin types.",
    image:
      "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1775063775/ChatGPT_Image_Apr_1_2026_08_12_42_PM_zeiqro.png",
    emoji: "✨",
  },
];

const categoryColors = {
  Gardening: "bg-[#F5E6D3] text-[#8B6F47]",
  Accessories: "bg-[#FAF3E0] text-[#A67C52]",
  "Home Care": "bg-[#FFF8F0] text-[#B08968]",
  Skincare: "bg-[#FDEFE3] text-[#C08457]",
  Plants: "bg-[#F7EBDD] text-[#9C7B5B]",
};

const FEEDBACK = [
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776481909/WhatsApp_Image_2026-04-17_at_21.31.03_1_ivilp1.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776481909/WhatsApp_Image_2026-04-17_at_21.31.02_n8qpnu.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776481909/WhatsApp_Image_2026-04-17_at_21.31.03_vmsqt2.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776483360/WhatsApp_Image_2026-04-18_at_09.03.04_s0uanu.jpg"
];

const VIDEOS = [
  "https://res.cloudinary.com/dyhe8bh7q/video/upload/v1776482570/WhatsApp_Video_2026-04-18_at_06.34.40_lek1ve.mp4",
  "https://res.cloudinary.com/dyhe8bh7q/video/upload/v1776482662/WhatsApp_Video_2026-04-18_at_06.34.41_rq3kof.mp4",
];

const GALLERY = [
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776485248/WhatsApp_Image_2026-04-18_at_09.25.16_bgwz2u.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776485235/WhatsApp_Image_2026-04-18_at_09.24.56_jlkmnx.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776485234/WhatsApp_Image_2026-04-18_at_09.24.54_biaaza.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776485234/WhatsApp_Image_2026-04-18_at_09.24.50_q8eweb.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776485234/WhatsApp_Image_2026-04-18_at_09.23.14_cxiema.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776484035/WhatsApp_Image_2026-04-18_at_09.12.09_1_kwxzbr.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776484004/WhatsApp_Image_2026-04-18_at_09.11.50_bspc7g.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776484032/WhatsApp_Image_2026-04-18_at_09.11.52_1_i088ry.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776484004/WhatsApp_Image_2026-04-18_at_09.11.51_1_lt7vmb.jpg",
  "https://res.cloudinary.com/dyhe8bh7q/image/upload/v1776484058/WhatsApp_Image_2026-04-18_at_09.12.15_sgfq7o.jpg",
]

const Blog = () => {
  const [tab, setTab] = useState("feedback");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sage text-sm font-medium tracking-widest uppercase mb-3">
          🌱 Plant Knowledge
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mb-4">
          The Green Journal
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto">
          Tips, guides, and stories about growing your green space — from
          beginner to expert.
        </p>
      </div>

      {/* Featured Post */}
      <div className="card overflow-hidden mb-10 group">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="overflow-hidden h-64 md:h-auto">
            <img
              src={BLOGS[0].image}
              alt={BLOGS[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${categoryColors[BLOGS[0].category]}`}
              >
                {BLOGS[0].category}
              </span>
              <span className="text-xs bg-red-500 px-3 py-1  text-white rounded-full animate-pulse">
                comming soon
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-800 mb-4 leading-tight">
              {BLOGS[0].title}
            </h2>
            <p className="text-stone-500 leading-relaxed mb-6">
              {BLOGS[0].excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-stone-400">
                {BLOGS[0].date} · {BLOGS[0].readTime}
              </div>
              <button aria-label="read-more" className="btn-primary text-sm px-5 py-2">
                Read More →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex justify-center gap-3 mb-10">
        {["gallery", "feedback", "videos"].map((t) => (
          <button
          aria-label="grid-button"
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
              tab === t ? "bg-moss text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "feedback" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FEEDBACK.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="feedback"
              className="h-auto  w-full object-cover rounded-xl hover:scale-105 transition"
            />
          ))}
        </div>
      )}

         {tab === "gallery" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="feedback"
              className="h-60  w-full object-cover rounded-xl hover:scale-105 transition"
            />
          ))}
        </div>
      )}

      {tab === "videos" && (
        <div className="grid md:grid-cols-2 gap-5">
          {VIDEOS.map((vid, i) => (
            <video
              key={i}
              controls
              className="w-full h-64 object-cover rounded-xl shadow"
            >
              <source src={vid} type="video/mp4" />
            </video>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
