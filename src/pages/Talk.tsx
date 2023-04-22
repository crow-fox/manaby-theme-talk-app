import { type FC } from "react";
import TalkBox from "@/features/themes/TalkBox";

const Talk: FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className=" font-bold ">トークする</h2>
      <div className="grid place-items-center">
        <TalkBox />
      </div>
    </section>
  );
};

export default Talk;
