import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { UserDataContext } from "../context/UserDataContext";
import "./coursedetail.css";
import "./Normalize.css";

interface Course {
  id: number;
  name: string;
  description: string;
  price: string;
  content?: string;
  image_url?: string;
}

const CourseDetail: React.FC = () => {
  const { pk } = useParams<{ pk: string }>();
  const navigate = useNavigate();

  const { cart, purchased, refreshUserData } = useContext(UserDataContext);

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pk) return;

    api
      .get<Course>(`courses/${pk}/`)
      .then((res) => setCourse(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [pk]);

  // ✅ Safe checks
  const isInCart = cart.some((item) => item.course?.id === Number(pk));
  const isPurchased = purchased.some((item) => item.id === Number(pk));

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access");
    if (!token) return navigate("/login", { state: { from: `/courses/${pk}` } });

    try {
      await api.post("cart/add/", { course_id: pk });
      refreshUserData();
      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  const handleClickPurcahsed = () => {
    navigate("/purchased");  // Navigate to the /purchased page
  };

  const handleClickCart = () => {
    navigate("/cart");  // Navigate to the /purchased page
  };

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <section style={{width:"100%", height:"90vh", display:"flex",  alignItems:"center", justifyContent: "center"}}>
    <main>
    <article className="product">
      {/* <section className="product__slider default-container" aria-label="Product preview"> */}
        {/* <div className="image-box" aria-label="Product preview" role="region"> */}
          <img style={{height: "100%",  width: "100%"}} src={course.image_url} className="image-box__src" data-product-id="item-cart-1" aria-controls="lightbox" aria-expanded="false"/>
        {/* </div> */}
      {/* </section> */}
      <section className="product__content default-container" aria-label="Product content">
        <header>
          <h2 className="company-name" ></h2>
          <p className="product__name" ></p>
          <h3 className="product__title" >{course.name}</h3>
        </header>
        <p className="product__description" >
          {course.description}
        </p>
        <div className="product__price">
          <div className="discount-price">
            <p className="discount-price__value" >
              ${course.price}
              {/* <span class="sr-only">dollars</span> */}
            </p>
            
          </div>
        </div>
        
        <div className="cart-form">
          {isPurchased ? (
       <button onClick={handleClickPurcahsed} type="button" className="cart-form__add-btn">
            See in Purchased
          </button>
      ) : isInCart ? (
        <button onClick={handleClickCart} type="button" className="cart-form__add-btn">
            Go to Cart
          </button>
      ) : (
          <button onClick={handleAddToCart} type="button" className="cart-form__add-btn">
            Add to cart
          </button>
           )}
        </div>
      </section>
    </article>
  </main>
  </section>
  );
};

export default CourseDetail;
