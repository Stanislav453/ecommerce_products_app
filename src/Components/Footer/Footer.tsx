import { Link } from "react-router-dom";
import orderCard from "../../../public/contact-1-600x276.webp";
import payMethod from "../../../public/payment-methods.webp";

export const Footer = () => {
  return (
    <footer className="flex justify-center bg-page-sections border-t-2 mt-20 border-gray-200">
      <div className=" px-5 pt-9 max-w-screen-xl">
        <div className="flex pb-9">
          <div className="flex flex-col flex-1">
            <h4>Glowzy.</h4>
            <p>
              Glowzy is committed to providing effective skincare while
              prioritizing sustainability and ethical sourcing. We believe in
              beauty that is good for you and the planet.
            </p>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="flex flex-col flex-1 items-center">
            <h4 className="pr-8">Spport</h4>
            <ul>
              <li>
                <Link to="/">Help</Link>
              </li>
              <li>
                <Link to="/">Buy to Earn</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">Visit Us</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col flex-1 items-center">
            <h4 className="pr-2">Information</h4>
            <ul>
              <li>
                <Link to="/">Privacy</Link>
              </li>
              <li>
                <Link to="/">Cookies</Link>
              </li>
              <li>
                <Link to="/">Term</Link>
              </li>
              <li>
                <Link to="/">Return Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <img src={orderCard} alt="banner" />
          </div>
        </div>
        <div className="flex justify-between items py-5 border-t-2 border-gray-200">
          <div>
            © 2024 | Glowzy | WooCommerce Theme by <Link to="/">ArtifyWeb</Link>
          </div>
          <div>
            <img src={payMethod} alt="payMethod" />
          </div>
        </div>
      </div>
    </footer>
  );
};
