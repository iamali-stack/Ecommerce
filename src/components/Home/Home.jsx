import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import Products from '../Products/Products';
export default function Home() {
 return <>
  <MainSlider/>
  <h3 className=" ps-20 text-xl text-start font-semibold my-4">Shop Popular Categories</h3>
    <CategorySlider/>
    <Products/>
    </>
  
}
