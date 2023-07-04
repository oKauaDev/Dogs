import React from "react";

const useMediaQuery = (width, setValue) => {
  const query = `(max-width: ${width}px)`;

  function queryReative() {
    setValue(window.matchMedia(query).matches);
  }

  function deleteQuery() {
    window.removeEventListener("resize", queryReative);
  }

  window.addEventListener("resize", queryReative);

  React.useEffect(() => {
    setValue(window.matchMedia(query).matches);
  }, [query, setValue]);

  return deleteQuery;
};

export default useMediaQuery;
