import useGetApi from '../../Hooks/getApi';
import Spinner from '../Spinner/Spinner';
export default function Brands() {
  const { data, isLoading, error } = useGetApi('brands');
// The API returns data in data.data, so we need to access it accordingly
  const brands = data?.data?.data || [];
  console.log(brands)
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error fetching data</p>;

 return (
     <>
      <h1 className='text-4xl font-semibold mb-5 text-center mt-7 text-green-600'>All Brands</h1>
      <div className=' max-w-8xl flex gap-y-8 mt-10 mb-10 flex-wrap justify-center mx-auto'>
        {brands.map((brand) => (
        <div key={brand._id} className="me-6 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 border
         border-gray-300 rounded-lg bg-white text-center p-6 hover:shadow-sm hover:shadow-green-500 hover:scale-105 transition-transform duration-100 hover:border-green-300  transition-shadow duration-500">
          <div className="product p-5">
          <img src={brand.image} alt={brand.name} />
          <h3 className='text-lg font-bold '>
            {brand.slug.charAt(0).toUpperCase() + brand.slug.slice(1)}
          </h3>
          </div>
        </div>
        ))}
      </div>
      </>
  );}