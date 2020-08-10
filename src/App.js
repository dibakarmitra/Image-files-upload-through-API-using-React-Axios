import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
   state = {
      images: [],
      totalFiles: 0,
      finalData: [],
   };

   imageFiles = (event) => {
      this.setState({
         images: event.target.files,
         totalFiles: event.target.files.length,
      });
   };

   submit = (e) => {
      e.preventDefault();

      const formData = new FormData();

      Array.from(this.state.images).forEach((image) => {
         formData.append("photos", image);
      });

      axios
         .post(`http://localhost:5000/upload-photos`, formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         })
         .then((res) => {
           let resData = res.data.data.map(img => {
             return img;
           });
           console.log(resData);
           this.setState({
             finalData: [...this.state.finalData, ...resData],
           });
         })
         .catch((err) => {
            console.log(err);
         });
   };


   render() {
      return (
         <div className="App">
            <form onSubmit={this.submit}>
               <input
                  type="file"
                  name="files"
                  onChange={this.imageFiles}
                  alt="image"
                  accept="image/*"
                multiple/>
               <br />
               <button type="submit">Upload</button>
            </form>

            <div>
               <h1>Images</h1>
               {this.state.finalData.map(img => <img key={Math.random(img.id)} src={img.url} alt={img.name} />)}
            </div>
         </div>
      );
   }
}

export default App;
