import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
// import { BsArrowRightCircleFill } from "react-icons/bs";
// import { BsArrowLeftCircleFill } from "react-icons/bs";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newData = await response.json();
      setVendorData(newData);
      console.log("this is api data", newData);
      setLoading(false);
    } catch (error) {
      alert("failed to fetch data");
      console.error("failed to fetch data");
      setLoading(true);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    if (direction === "left") {
      gallery.scrollTo({
        left: gallery.scrollLeft - scrollAmount,
        behaviour: "smooth",
      });
    } else if (direction === "right") {
      gallery.scrollTo({
        left: gallery.scrollLeft + scrollAmount,
        behaviour: "smooth",
      });
    }
  };

  return (
    <div className='mediaChainSection'>
<div className="loaderSection">
{loading && <>
      <div className="loader">
      Your 🥣 is Loading...
    </div>
    <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
    </>
      
    }
</div>
    <div className="btnSection">
      <button onClick={()=>handleScroll("left")}>
      <FaRegArrowAltCircleLeft className='btnIcons'/>
      </button>
      <button onClick={()=>handleScroll("right")}>
      <FaRegArrowAltCircleRight className='btnIcons'/>
      </button>
    </div>
          <h3 className='chainTitle'>Top restaurant chains in Hyderabad</h3>
      <section className="chainSection" id="chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollf)}>
          {vendorData.vendors && vendorData.vendors.map((vendor)=>{
                 return(
                  <>
                   <div className="vendorBox">
                      {vendor.firm.map((item)=>{
                          return(
                             <>
                              <div>
                                   {item.firmName} 
                                
                              </div>
                      <Link to={`/products/${item._id}/${item.firmName}`} className="link" key={item._id}>
                      <div className="firmImage">
                                  <img src= {`${API_URL}/uploads/${item.image}`} />
                              </div>
                      </Link>
                             </>

                          )
                      })}
                  </div>
                  </>
                 )
          })}
      </section>
    </div>
)
}

export default Chains









//   return (
//     <>
//       {loading && (
//         <>
//           <div className="loader">
//             <ColorRing
//               visible={true}
//               height="80"
//               width="80"
//               ariaLabel="color-ring-loading"
//               wrapperStyle={{}}
//               wrapperClass="color-ring-wrapper"
//               colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
//             />
//           </div>
//         </>
//       )}
//       <div className="btnSection">
//         <button onClick={() => handleScroll("left")}>
//           <BsArrowLeftCircleFill className="btnIcons" />
//         </button>
//         <button onClick={() => handleScroll("right")}>
//           <BsArrowRightCircleFill className="btnIcons" />
//         </button>
//       </div>
//       <h3>Top Chains In Hyderabad</h3>
//       <section
//         className="chainSection"
//         id="chainGallery"
//         onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
//       >
//         {vendorData.vendors &&
//           vendorData.vendors.map((vendor) => {
//             return (
//               <>
//                 <div className="vendorBox">
//                   {vendor.firm.map((item) => {
//                     return (
//                       <>
//                         <div>{item.firmName}</div>
//                         <div className="firmImage">
//                           <img
//                             src={`${API_URL}/uploads/${item.image}`}
//                             alt=""
//                           />
//                         </div>
//                       </>
//                     );
//                   })}
//                 </div>
//               </>
//             );
//           })}
//       </section>
//     </>
//   );
// };

// export default Chains;

