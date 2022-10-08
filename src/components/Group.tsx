interface IProps {
  name: string;
  description: string;
  image: string;
}
const Group = ({ name, description, image }: IProps) => {
  return (
    <div className="sm:flex py-2">
      <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
      <img
        className="inline-block h-14 w-14 rounded-full"
        src={image}
        alt={name}
      />
      </div>
      <div className="flex md:space-x-5 space-x-3 w-full">
        <div className="w-4/6 xl:w-11/12 lg:w-10/12">
          <h4 className="tracking-wide text-lg text-blue-500 dark:text-zinc-200">{name}</h4>
          <p className="mt-1">{description}</p>
        </div>
        <div className="w-2/6 xl:w-1/12 lg:w-2/12 text-sm">
          <button className="bg-blue-500 dark:bg-zinc-900 py-2 px-2 rounded-md text-zinc-200 dark:text-zinc-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Group;
