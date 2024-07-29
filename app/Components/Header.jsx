import React from "react";

function Header() {
  return (
    <div>
      <main className="flex flex-row items-center justify-start mt-5 ml-5 gap-2">
        <svg
          class="w-10 h-10 text-gray-800 dark:text-black"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>

        <h1 className="underline font-bold text-3xl">Rules creation</h1>
        <button className="mb-4 ml-[800px] bg-green-500 text-white py-2 px-4 rounded">
          Publish
        </button>
      </main>
    </div>
  );
}

export default Header;
