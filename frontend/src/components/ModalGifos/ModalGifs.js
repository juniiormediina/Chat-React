import React from "react";

const ModalGifs = (props) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      show={props.show}
      onHide={() => props.setShow(false)}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Gifs
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {props.gifs.map((gif) => {
              return (
                <div key={gif.id} md="3" className="mb-3">
                  <img
                    className="gifs__img"
                    src={gif.images.preview_gif.url}
                    onClick={(e) => props.gifClick(e.target.src, props.setShow)}
                    alt="gifs"
                  ></img>
                </div>
              );
            })}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGifs;
