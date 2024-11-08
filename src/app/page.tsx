import Image from "next/image";

const Card = () => {
  return (
    <div className="border p-4 flex flex-col">
      <div className="flex flex-col gap-3">
        <h5>Title</h5>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
          ea eaque impedit autem beatae quidem, sunt non adipisci
        </p>
      </div>

      <div className="flex justify-between mx-4">
        <div className="flex gap-3">
          <div>Like</div>
          <div>Dislike</div>
        </div>

        <div>comment</div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex gap-4">
      {/* SIDE BAR  */}
      <div className="flex flex-col border-b gap-4 p-3 w-[20%] h-[100%]">
        <div> Lorem ipsum dolor sit, amet</div>
        <div> Lorem ipsum dolor sit, amet</div>
        <div> Lorem ipsum dolor sit, amet</div>
        <div> Lorem ipsum dolor sit, amet</div>
      </div>

      {/* articles cards */}
      <div className="flex gap-4 wrap w-[80%]">
        {[1, 2, 3, 4, 5,7,8,9].map((_, index) => {
          return <Card key={index} />;
        })}
      </div>
    </div>
  );
}
