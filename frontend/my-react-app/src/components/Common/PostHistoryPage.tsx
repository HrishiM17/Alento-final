import React, { useState, useMemo } from "react";

import {
  ArrowUpRight,
  Heart,
  MessageCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

type Post = {
  id: number;
  text: string;
  image: string;
  date: string;
  likes: number;
  comments: number;
  editedAt?: string;
};

const dummyPosts: Post[] = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur. Gravida nulla commodo nisl lorem amet pellentesque ipsum. In mauris ipsum duis dolor. Fusce dolor at eu mollis tortor auctor. Potenti enim nibh odio tristique eget ornare sit nibh. Integer mattis sed vestibulum at. Dui mattis elit eleifend tincidunt ac in malesuada.",
    image:
      "https://cdn.pixabay.com/photo/2016/03/31/19/55/book-1296045_1280.png",
    date: "2025-01-12T05:54:00",
    likes: 26,
    comments: 4,
    editedAt: "2025-01-13T06:00:00",
  },
  {
    id: 2,
    text: "Curabitur pellentesque consequat metus fermentum tellus diam. Eu nisl ac semper orci. Ultricies velit risus pellentesque est.",
    image:
      "https://cdn.pixabay.com/photo/2020/06/17/09/43/children-5305200_1280.jpg",
    date: "2024-12-30T12:00:00",
    likes: 14,
    comments: 2,
    editedAt: "2025-01-05T10:30:00",
  },
];

const PostHistoryPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "edited">("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "edited")
        return (
          new Date(b.editedAt ?? b.date).getTime() -
          new Date(a.editedAt ?? a.date).getTime()
        );
      return 0;
    });
  }, [posts, sortBy]);

  // --- Empty State ---
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex bg-white">
        
        <main className="flex-1 flex flex-col items-center justify-center text-center p-12">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Post History
          </h1>
          <p className="text-gray-500 mb-10 text-[14px]">
            View all the posts you’ve published so far.
          </p>
          <div className="w-[150px] h-[150px] bg-[#F3F6FB] border border-[#D1D5DB] rounded-2xl flex items-center justify-center mb-6">
            <span className="text-[#1A67D8] font-bold text-lg">📄</span>
          </div>
          <h2 className="text-gray-900 font-medium text-[16px] mb-2">
            You have not created any post yet
          </h2>
          <p className="text-gray-500 text-[14px] max-w-md leading-snug">
            Once you create and publish posts, they’ll appear here.
            <br /> Try creating a post from the “Create Content” section.
          </p>
        </main>
      </div>
    );
  }

  // --- With Posts ---
  return (
    <div className="min-h-screen flex bg-white">
      

      <main className="flex-1 p-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Post History
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              View all the posts you’ve published so far.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="text-[14px] text-[#1A67D8] font-medium flex items-center gap-1"
            >
              Sort By
              {showSortMenu ? (
                <ChevronUp size={16} stroke="#1A67D8" />
              ) : (
                <ChevronDown size={16} stroke="#1A67D8" />
              )}
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg py-2 z-10">
                {[
                  { key: "newest", label: "Newest First" },
                  { key: "oldest", label: "Oldest First" },
                  { key: "edited", label: "Last Edited" },
                ].map((option) => (
                  <label
                    key={option.key}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === option.key}
                      onChange={() => {
                        setSortBy(option.key as any);
                        setShowSortMenu(false);
                      }}
                      className="accent-[#1A67D8]"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] justify-items-center">
  {sortedPosts.map((post) => (
    <div
      key={post.id}
      className="
        w-[512px] h-[491.79px]
        bg-white border border-gray-300 rounded-[20px]
        p-[24px] flex flex-col justify-between
      "
    >
      {/* Header */}
      <div className="flex justify-end items-center w-[464px] h-[14px] gap-[10px]">
        <p className="text-[12px] text-gray-500 text-right">
          Posted on{" "}
          {new Date(post.date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Text Section */}
      <div className="w-[464px] h-[102px] gap-[10px] overflow-hidden">
        <p className="text-gray-800 text-[14px] leading-relaxed line-clamp-5">
          {post.text}
        </p>
      </div>

      {/* Image Section */}
      <div className="w-[464px] h-[219.78px] rounded-[12px] overflow-hidden">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-full object-cover rounded-[12px]"
        />
      </div>

      {/* Bottom Section */}
      <div className="w-[464px] h-[36px] flex items-center justify-between mt-auto">
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[6px]">
            <svg className="w-4 h-4 text-[#1A67D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-8.682a4.5 4.5 0 010-6.364z" />
            </svg>
            <span className="text-[14px] text-gray-700">{post.likes}</span>
          </div>

          <div className="flex items-center gap-[6px]">
            <svg className="w-4 h-4 text-[#1A67D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h8m-8 4h6" />
            </svg>
            <span className="text-[14px] text-gray-700">
              {post.comments} Comments
            </span>
          </div>
        </div>

        <a
          href="#"
          className="flex items-center gap-[6px] text-[#1A67D8] text-[14px] hover:underline"
        >
          View On LinkedIn
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  ))}
</div>

      </main>
    </div>
  );
};

export default PostHistoryPage;
