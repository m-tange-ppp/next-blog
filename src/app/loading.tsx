import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center gap-6 mt-10">
      <div className="h-10 w-10 animate-spin border-4 border-sky-400 rounded-full border-t-transparent"></div>
      <p className="text-center text-xl rounded-md font-semibold text-slate-200">
        Loading...
      </p>
    </div>
  );
}

export default Loading;
