import { useState } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../.././services/firebase"
import { useNavigate, useParams } from "react-router-dom";
import { doApiMethod, server_url } from "../../services/apiServices";

const UpdateProd = () => {
    const nav = useNavigate();
    const params = useParams();
    const productId = params["productId"];
    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );
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
        setcCat(e.target.value.split(' , '));
    }

    const handleColor = (e) => {
        setColor(e.target.value.split(' , '));
    }

    const handleSize = (e) => {
        let mySize = e.target.value.toUpperCase();
        setSize(mySize.split(' , '));
    }

    const updateProduct = async (product) => {

        let url = server_url + `/products/${productId}`;
        try {
            let resp = await doApiMethod(url, "PUT", product)
            if (resp.data) {
                alert("update succefuly");
                nav("/admin/products")
            }
            else {
                alert("There problem , try again later")
            }
        }
        catch (err) {
            console.log(err);
            alert("There problem")
        }
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
                    updateProduct(product)
                });
            }
        );

    }


    return (
        <div className="newProduct">
            <h1 className="addProductTitle">Update Product</h1>
            <form className="addProductForm">

                <div className="addProductItem">
                    <label>Product img:</label>
                    <input required onChange={e => setFile(e.target.files[0])} type="file" id="file" />
                </div>

                <div className="addProductItem">
                    <label>Product Title:</label>
                    <input required name="title" placeholder={product.title} type="text" onChange={handleChange} />
                </div>

                <div className="addProductItem">
                    <label>Product Description:</label>
                    <input required name="desc" placeholder={product.desc} type="text" onChange={handleChange} />
                </div>


                <div className="addProductItem">
                    <label>Product Price:</label>
                    <input required name="price" placeholder={product.price} type="number" onChange={handleChange} />
                </div>

                <div className="addProductItem">
                    <label>Product categories:</label>
                    <input required onChange={handleCat} placeholder={product.categories} type="text" />
                </div>

                <div className="addProductItem">
                    <label>Product size:</label>
                    <input required onChange={handleSize} placeholder={product.size} type="text" />
                </div>

                <div className="addProductItem">
                    <label>Product color:</label>
                    <input required onChange={handleColor} placeholder={product.color} type="text" />
                </div>
                <button onClick={handleClick} className="addProductButton">Create</button>


            </form>
        </div>
    );
}


export default UpdateProd