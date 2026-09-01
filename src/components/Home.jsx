// import React from "react";
// import Card from "./Card";
// import Data from "../data.json";
// const Home = () => {
//   return (
//     <div>
//       <div>
//         {Data.map((item) => (
//           <Card key={item.id} title={item.title} content={item.content} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import Card from "./Card";
import Data from "../data.json";
import "./Home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get categories dynamically from data.json
  const categories = ["All", ...new Set(Data.map((item) => item.category))];

  // Filter posts by title and category
  const filteredData = Data.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home">
      <h1>Blog Posts</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="posts">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Card key={item.id} title={item.title} content={item.content} />
          ))
        ) : (
          <p className="no-results">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
