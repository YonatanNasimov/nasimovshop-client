import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../features/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../services/firebase"
import "./newProduct.css";

export default function NewProduct() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");
  const [cat, setcCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCat = (e) => {
    setcCat(e.target.value.split(`,`));
  }

  const handleColor = (e) => {
    setColor(e.target.value.split(`,`));
  }

  const handleSize = (e) => {
    let mySize = e.target.value.toUpperCase();
    setSize(mySize.split(`,`));
  }

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storege = getStorage(app);
    const storageRef = ref(storege, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img_url: downloadURL, categories: cat, color, size };
          addProduct(product, dispatch)
        });
      }
    );

  }
  // console.log(file);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">

        <div className="addProductItem">
          <label>Product img:</label>
          <input aria-required onChange={e => setFile(e.target.files[0])} type="file" id="file" />
        </div>

        <div className="addProductItem">
          <label>Product Title:</label>
          <input required name="title" placeholder="shirt.." type="text" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Product Description:</label>
          <input required name="desc" placeholder="blue shirt for summer" type="text" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Product Price:</label>
          <input required name="price" placeholder="30" type="number" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Product categories:</label>
          <input required onChange={handleCat} placeholder="shirt,summer" type="text" />
        </div>

        <div className="addProductItem">
          <label>Product size:</label>
          <input required onChange={handleSize} placeholder="M,L" type="text" />
        </div>

        <div className="addProductItem">
          <label>Product color:</label>
          <input required onChange={handleColor} placeholder="red,blue" type="text" />
        </div>

        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
