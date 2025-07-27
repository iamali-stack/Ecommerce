import useGetApi from '../../Hooks/getApi';
import Spinner from '../Spinner/Spinner';
export default function Categories() {
  const { data, isLoading, error } = useGetApi('categories');
// The API returns data in data.data, so we need to access it accordingly
  const categories = data?.data?.data || [];
  console.log(categories)
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error fetching data</p>;

return(
 <>
                <h1 className='text-4xl font-semibold mb-5 text-center mt-7 text-green-600'>All Categories</h1>

          <div className="flex flex-wrap justify-center w-full md:w-3/3 mx-auto gap-6 py-10">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden flex flex-col w-full md:w-1/2 lg:w-1/3 hover:shadow-[0_0_16px_rgba(34,197,94,0.3)] hover:border-green-400 transition-all duration-300 cursor-pointer"
                style={{ minWidth: '260px', maxWidth: '400px' }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover"
                />
                <div className="w-full py-4 flex justify-center items-center">
                  <h3 className="text-green-600 text-2xl font-semibold text-center">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
          </>
)
}