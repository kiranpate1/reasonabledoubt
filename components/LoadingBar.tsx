import { projects } from "../app/projects";

type Props = {
  status: string;
  message: string;
  activeIndex: number;
};

const LoadingBar = ({ status, message, activeIndex }: Props) => {
  return (
    <div className="w-screen detail text-[12px] flex justify-between">
      <div className="flex gap-20">
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
      <div className="flex gap-4">
        <div className="opacity-60">
          {status == "Error 404" ? "Renaissance" : projects[activeIndex]?.id}
        </div>
        <div>
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
