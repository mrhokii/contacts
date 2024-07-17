import { CURRENTLINE, COMMENT, GRAY } from "../helpers/color";

const Contact = ({ contact , confirmDelete}) => {
  return (
    <>
      <div className="col-6">
        <div className="card" style={{ backgroundColor: CURRENTLINE }}>
          <div className="card-body">
            <div className="row d-flex align-items-center  justify-content-center">
              <div className="col-3">
                <img style={{width : "150px" , height : "120px" , borderRadius : "8px"}}
                  src={contact.photo || "https://via.placeholder.com/150"}
                  alt=""
                />
              </div>
              <div className="col-7">
                <ul className="list-group">
                  <li
                    className="list-group-item disabled"
                    style={{ backgroundColor: GRAY }}
                  >
                    نام: <span className="fw-bold">{contact.fullname}</span>
                  </li>
                  <li
                    className="list-group-item disabled"
                    style={{ backgroundColor: GRAY }}
                  >
                    شماره تماس:{" "}
                    <span className="fw-bold">{contact.mobile}</span>
                  </li>
                  <li
                    className="list-group-item disabled"
                    style={{ backgroundColor: GRAY }}
                  >
                    ایمیل: <span className="fw-bold">{contact.email}</span>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <button className="btn btn-warning my-1">
                  {" "}
                  <i className="fa fa-eye"></i>{" "}
                </button>
                <button className="btn btn-info my-1">
                  {" "}
                  <i className="fa fa-edit"></i>{" "}
                </button>
                <button onClick={confirmDelete} className="btn btn-danger text-dark my-1">
                  {" "}
                  <i className="fa fa-trash"></i>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
