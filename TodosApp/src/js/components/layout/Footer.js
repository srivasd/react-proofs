import React from "react";


export default class Footer extends React.Component {
  render() {
    const footerStyles = {
      marginTop: "30px",
    };

    return (
      <footer style={footerStyles}>
        <div class="row">
          <div class="col-lg-12">
            <p>Implemented by Sergio Rivas Delgado <span class="glyphicon glyphicon-user"></span></p>
          </div>
        </div>
      </footer>
    );
  }
}
