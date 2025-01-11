"use client";

import { useEffect } from "react";

type Props = {
  status: string;
  message: string;
};

const LoadingBar = ({ status, message }: Props) => {
  return (
    <div className="w-screen detail text-[12px] flex gap-20">
      <div>{status}</div>
      <div className="flex flex-row gap-2 items-center">
        <div
          id="loadingBar"
          className="flex flex-row h-2 gap-[1px] py-0.5 px-[1.5px] border-white border-solid border-[0.5px]"
        >
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
          <div className="w-1 h-full bg-white"></div>
        </div>
        <div id="loadingMessage">{message}</div>
      </div>
    </div>
  );
};

export default LoadingBar;
