import { Category } from "../../type";
import { useNavigate } from "react-router";

export const ShopFilter = () => {
  const navigate = useNavigate();

  const selectCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Category;

    if (value === "all") {
      navigate("/shop");
    } else {
      navigate(`/shop/category/${value}`);
    }
  };

  return (
    <select
      className="border-2"
      name="category-filter"
      onChange={(e) => selectCategoryHandler(e)}
    >
      <option value="all">category</option>
      <option value="all">all</option>

      <option value="beauty">beauty</option>
      <option value="fragrances">fragrances</option>
      <option value="furniture">furniture</option>
      <option value="groceries">groceries</option>
      <option value="home-decoration">home-decoration</option>
      <option value="kitchen-accessories">kitchen-accessories</option>

      <option value="laptops">laptops</option>
      <option value="smartphones">smartphones</option>
      <option value="tablets">tablets</option>
      <option value="mobile-accessories">mobile-accessories</option>

      <option value="mens-shirts">mens-shirts</option>
      <option value="mens-shoes">mens-shoes</option>
      <option value="mens-watches">mens-watches</option>

      <option value="womens-bags">womens-bags</option>
      <option value="womens-dresses">womens-dresses</option>
      <option value="womens-jewellery">womens-jewellery</option>
      <option value="womens-shoes">womens-shoes</option>
      <option value="womens-watches">womens-watches</option>

      <option value="skin-care">skin-care</option>
      <option value="sports-accessories">sports-accessories</option>
      <option value="sunglasses">sunglasses</option>
      <option value="tops">tops</option>

      <option value="motorcycle">motorcycle</option>
      <option value="vehicle">vehicle</option>
    </select>
  );
};
