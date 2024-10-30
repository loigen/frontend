// import React, { useState } from "react";

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       onSearch(query); // Call the onSearch prop with the search query
//       setQuery(""); // Clear the input field after search
//     }
//   };

//   return (
//     <div className="flex items-center justify-center p-4">
//       <form onSubmit={handleSearch} className="w-full max-w-md">
//         <div className="flex border border-[#68B2A0]  overflow-hidden rounded-full">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search..."
//             className="flex-grow p-3 outline-none border-none focus:ring-2 focus:ring-[#68B2A0] text-sm "
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 transition-colors bg-[rgba(104,178,160,0.13)] hover:bg-[#68B2A0] text-[#68B2A0] hover:text-[#ffff]"
//           >
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;
