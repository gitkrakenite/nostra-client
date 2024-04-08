import React from "react";
import { useLocation } from "react-router-dom";

const CategoryFetch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("cat");

  return (
    <div>
      <p className="text-4xl mb-[3em] ">{category && category}</p>
    </div>
  );
};

export default CategoryFetch;
