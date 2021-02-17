import React from "react";

const ModalGifs = (props) => {
  return (
    <div
      size="lg"
      show={props.show}
      onHide={() => props.setShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <div className="closeButton">
        <h2 id="example-modal-sizes-title-lg">Gifs</h2>
      </div>
      <div>
        <div>
          {props.gifs.map((gif) => {
            return (
              <div key={gif.id} md="3" className="mb-3">
                <img
                  className="w-100 h-100"
                  src={gif.images.preview_gif.url}
                  onClick={(e) => props.gifClick(e.target.src, props.setShow)}
                  alt="gifs"
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalGifs;
