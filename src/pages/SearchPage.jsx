import { Layout } from "../components";

const SearchPage = () => {
  return (
    <Layout>
      <div className="w-full min-h-screen flex items-start justify-center border2 border-red-500 lg:border-r lg:border-l lg:border-[#ededed] dark:md:border-gray-900 transition duration-500 md:px-12 pb-12">
        <div className="min-h-[calc(100vh-4rem)] w-full bg-white flex flex-col items-center justify-start text-black pt-4">
          <span className="leading-1">Search results</span>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
