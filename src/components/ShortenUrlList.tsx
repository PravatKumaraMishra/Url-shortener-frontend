import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data }: any) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <div className="my-6 space-y-4">
      {data.map((item: any) => (
        <ShortenItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ShortenUrlList;
