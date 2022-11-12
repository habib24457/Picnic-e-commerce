import React, { useState, useContext } from "react";
import CommonNav from "../CommonNav/CommonNav";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import Footer from "../Footer/Footer.js";
import adminPhoto from "../../images/admin.jpg";
import { API } from "../Constant/Constant";

const ContinuePage = () => {
  const [isAdmin, setAdmin] = useState(false);
  const [loggedinUser] = useContext(UserContext);
  const history = useHistory();

  const checkAdmin = () => {
    //console.log(loggedinUser);
    const adminMail = loggedinUser.email;
    fetch(API + `/getAdmin/${adminMail}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          history.replace("/manage");
        } else {
          console.log(data);
          setAdmin(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const superAdmin = () => {
    const superEmail = document.getElementById("super-email").value;
    console.log(superEmail);
    if (superEmail.length > 0 && superEmail === "habiburehman390@gmail.com") {
      history.replace("/manage");
    } else {
      alert("You have to enter the correct email address");
    }
  };

  return (
    <div className="container">
      <CommonNav></CommonNav>
      <div className="row">
        <div className="col-md-6 mt-5 pt-5">
          {isAdmin ? (
            <div>
              <h5 className="text-danger">
                You are not an admin. But you can still check out admin panel by
                using the super admin email-{" "}
                <span className="text-success">habiburehman390@gmail.com</span>{" "}
              </h5>
              <input
                type="text"
                id="super-email"
                className="form-control"
                placeholder="copy and paste the email here and press OK"
                required
              />
              <button
                onClick={() => {
                  superAdmin();
                }}
                className="button-design"
              >
                OK
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-success">In admin Panel You can do</h3>
              <ul>
                <li>
                  CRUD Operation(Add Product,Update Product,Delete Product)
                </li>
                <li>Add new admin</li>
                <li>Check ordered products</li>
              </ul>
              <button
                onClick={() => {
                  checkAdmin();
                }}
                className="button-design"
              >
                Continue
              </button>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <img
            src={adminPhoto}
            style={{ width: "550px", height: "550px" }}
            alt=""
          />
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ContinuePage;
