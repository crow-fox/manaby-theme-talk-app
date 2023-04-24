import { type FC } from "react";

const NotFound: FC = () => {
  return (
    <section className="grid gap-y-2">
      <h2 className="font-bold">404 Not Found</h2>
      <p>お探しのページは見つかりませんでした。</p>
      <p>
        URLが間違っているか、すでに削除されたか、変更された可能性があります。
      </p>
    </section>
  );
};

export default NotFound;
