import styles from "../styles/Admin.module.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateNonce, validateNonce } from '../public/nonceUtils';

export default function Admin() {
  const [newCategory, setNewCategory] = useState('');
  const [delCategory, setDelCategory] = useState('');
  const [delProduct, setDelProduct] = useState('');
  const [oldCategory, setOldCategory] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [oldProduct, setOldProduct] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateItem, setUpdateItem] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateInventory, setUpdateInventory] = useState('');
  const [updateImage, setUpdateImage] = useState('');
  const [nonce, setNonce] = useState('');
  const [order, setOrder] = useState([]);

  const handleOldCategoryChange = (event) => {
    setOldCategory(event.target.value);
  };

  const handleOldProductChange = (event) => {
    setOldProduct(event.target.value);
  };

  const handlUpdateItemChange = (event) => {
    setUpdateItem(event.target.value);
  };

  const handleUpdateCategoryChange = (event) => {
    setUpdateCategory(event.target.value);
  };

  const handleUpdateDescriptionChange = (event) => {
    const { value } = event.target;
    const words = value.split(' ');

    if (words.length <= 200) {
      setUpdateDescription(value);
    }
  };

  const handleUpdateNameChange = (event) => {
    setUpdateName(event.target.value);
  };

  const handleUpdatePriceChange = (event) => {
    setUpdatePrice(event.target.value);
  };

  const handleUpdateInventoryChange = (event) => {
    setUpdateInventory(event.target.value);
  };

  const handleUpdateImageChange = (event) => {
    setUpdateImage(event.target.value);
  };

  const handleDelCategoryChange = (event) => {
    setDelCategory(event.target.value);
  };

  const handleDelProductChange = (event) => {
    setDelProduct(event.target.value);
  };

  const handleDelCategoryClick = async () => {
    const isValidNonce = validateNonce(nonce, storedNonces);
    if (!isValidNonce) {
      setError('Invalid nonce');
      return;
    }
    try {
      const response = await fetch('/api/delCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ delCategory }),
      });

      if (response.ok) {
        console.log('Category deleted successfully!');
      } else {
        console.error('Error deleting category:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleUpdateCategory = async () => {
    const isValidNonce = validateNonce(nonce, storedNonces);
    if (!isValidNonce) {
      setError('Invalid nonce');
      return;
    }
    try {
      const response = await fetch('/api/updateCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updateCategory, oldCategory }),
      });

      if (response.ok) {
        console.log('Product updated successfully!');
      } else {
        console.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleUpdateProduct = async () => {
    const isValidNonce = validateNonce(nonce, storedNonces);
    if (!isValidNonce) {
      setError('Invalid nonce');
      return;
    }
    if (updateItem === 'description') {
      try {
        const response = await fetch('/api/updateDescription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateDescription, oldProduct }),
        });

        if (response.ok) {
          console.log('Product updated successfully!');
        } else {
          console.error('Error updating product:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else if (updateItem === 'name') {
      try {
        const response = await fetch('/api/updateName', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateName, oldProduct }),
        });

        if (response.ok) {
          console.log('Product updated successfully!');
        } else {
          console.error('Error updating product:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else if (updateItem === 'price') {
      try {
        const response = await fetch('/api/updatePrice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updatePrice, oldProduct }),
        });

        if (response.ok) {
          console.log('Product updated successfully!');
        } else {
          console.error('Error updating product:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else if (updateItem === 'inventory') {
      try {
        const response = await fetch('/api/updateInventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateInventory, oldProduct }),
        });

        if (response.ok) {
          console.log('Product updated successfully!');
        } else {
          console.error('Error updating product:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else if (updateItem === 'image') {
      try {
        const response = await fetch('/api/updateImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ updateImage, oldProduct }),
        });

        if (response.ok) {
          console.log('Product updated successfully!');
        } else {
          console.error('Error updating product:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

  };

  const handleDelProductClick = async () => {
    const isValidNonce = validateNonce(nonce, storedNonces);
    if (!isValidNonce) {
      setError('Invalid nonce');
      return;
    }
    try {
      const response = await fetch('/api/delProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ delProduct }),
      });

      if (response.ok) {
        console.log('Product deleted successfully!');
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleNewCategoryClick = async () => {
    const isValidNonce = validateNonce(nonce, storedNonces);
    if (!isValidNonce) {
      setError('Invalid nonce');
      return;
    }
    try {
      const response = await fetch('/api/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newCategory }),
      });

      if (response.ok) {
        console.log('Category inserted successfully!');
      } else {
        console.error('Error inserting category:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const [categoryAll, setCategoryAll] = useState([]);
  const [productAll, setProductAll] = useState([]);

  useEffect(() => {
    setNonce(generateNonce());
    fetch('/api/readCookie')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.auth);
        if(data.auth == false){
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    fetch('/api/category')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCategoryAll(data.categoryAll);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    fetch('/api/allProduct')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProductAll(data.allProducts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    fetch('/api/order')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setOrder(data.orders);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(undefined);
  const [productInventory, setProductInventory] = useState(undefined);
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(undefined);
  const [newProductCategory, setNewProductCategory] = useState('');

  const handleProductName = (event) => {
    setProductName(event.target.value);
  };
  const handleProductPrice = (event) => {
    setProductPrice(event.target.value);
  };
  const handleProductInventory = (event) => {
    setProductInventory(event.target.value);
  };
  const handleProductDescription = (event) => {
    const { value } = event.target;
    const words = value.split(' ');

    if (words.length <= 200) {
      setProductDescription(value);
    }
  };

  const handleProductImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height && width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          } else if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const resizedDataURL = canvas.toDataURL('image/jpeg', 0.7);

          setProductImage(resizedDataURL);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewProductCategory = (event) => {
    setNewProductCategory(event.target.value);
  };

  const handleNewProductClick = async () => {
    const isValidNonce = validateNonce(nonce, storedNonces);
    if (!isValidNonce) {
      setError('Invalid nonce');
      return;
    }
    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, productPrice, productInventory, productDescription, productImage, newProductCategory }),
      });

      if (response.ok) {
        console.log('Product inserted successfully!');
      } else {
        console.error('Error inserting product:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const storedNonces = [nonce]; 

  console.log(order);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h4>CERAMIC WORLD - ADMIN PANEL</h4>
      </header>
      <body className={styles.AppBody}>
        <dir>
          <br></br>
          <Link to={'/'}><p className={styles.Back}>Back to Home Page</p></Link>
          <br></br>
          <h5 className={styles.TableTitle}>All Orders</h5>
          <table className={styles.Table}>
            <tr>
              <th className={styles.Column}>Invoice ID</th>
              <th className={styles.Column}>Date</th>
              <th className={styles.Column}>Status</th>
              <th className={styles.Column}>User Name</th>
              <th className={styles.Column}>Product</th>
              <th className={styles.Column}>Total Amount</th>
            </tr>
            {order.map((order) => {
              const orderDetails = JSON.parse(order.orderDetails);
              const totalAmount = orderDetails ? orderDetails.reduce((sum, item) => {
                const quantity = parseInt(item.quantity);
                const unitAmount = parseFloat(item.unit_amount.value);
                return sum + quantity * unitAmount;
              }, 0) : 0;

              return (
                <tr key={order.UUID}>
                  <td className={styles.Detail}>{order.UUID}</td>
                  <td className={styles.Detail}>{order.date}</td>
                  <td className={styles.Detail}>{order.status}</td>
                  <td className={styles.Detail}>{order.username}</td>
                  <td className={styles.Detail}>
                    {Array.isArray(orderDetails) ? (
                      orderDetails.map(item => (
                        <p key={item.name}>
                          {`${item.quantity} ${item.name}: $${item.unit_amount.value}`}
                        </p>
                      ))
                    ) : (
                      <p>No order details available.</p>
                    )}
                  </td>
                  <td className={styles.Detail}>${totalAmount.toFixed(2)}</td>
                </tr>
              );
            })}
          </table>
          <br></br>
          <div className={styles.Row}>
            <div className={styles.Column}>
              <h5 className={styles.Title}>New Category</h5>
              <form>
                <label className={styles.Label}>Name </label>
                <input type="text" id="newCategory" name="newCategory" value={newCategory} onChange={handleNewCategoryChange} required />
                <br></br>
                <input type="hidden" name="nonce" value={nonce} />
                <button className={styles.Submit} onClick={handleNewCategoryClick}>Submit</button>
              </form>
            </div>
            <div className={styles.Column}>
              <h5 className={styles.Title}>New Product</h5>
              <form>
                <label className={styles.Label}>Category </label>
                <select className={styles.Select} name="newProductCategory" id="newProductCategory" onChange={handleNewProductCategory} required>
                  {categoryAll.map((category) => (
                    <option key={category.cid} value={category.cid}>{category.name}</option>
                  ))}
                </select>
                <br></br>
                <label className={styles.Label}>Name</label>
                <input type="text" id="productName" name="productName" onChange={handleProductName} required />
                <br></br>
                <label className={styles.Label}>Price </label>
                <input type="number" id="productPrice" name="productPrice" onChange={handleProductPrice} required />
                <br></br>
                <label className={styles.Label}>Inventory </label>
                <input type="number" id="productInventory" name="productInventory" onChange={handleProductInventory} required />
                <br></br>
                <label className={styles.Label}>Description </label>
                <textarea type="text" id="productDescription" name="productDescription" onChange={handleProductDescription} required />
                <br></br>
                <div className={styles.ImageInput}>
                  <div className={styles.DropImage}>
                    <div className={styles.ImageView}>
                      <input className={styles.ImageButton} type="file" id="productImage" name="productImage" accept="image/jpeg, image/gif, image/png" onChange={handleProductImage} required />
                      <h6>Drag and drop your image here.</h6>
                    </div>
                  </div>
                </div>
                <br></br>
                <input type="hidden" name="nonce" value={nonce} />
                <button className={styles.Submit} onClick={handleNewProductClick}>Submit</button>
              </form>
            </div>
          </div>
          <br></br>
          <div className={styles.Row}>
            <div className={styles.Column}>
              <h5 className={styles.Title}>Delete Category</h5>
              <form>
                <label className={styles.Label}>Category </label>
                <select className={styles.Select} name="category" id="category" onChange={handleDelCategoryChange} required>
                  {categoryAll.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <br></br>
                <input type="hidden" name="nonce" value={nonce} />
                <button className={styles.Submit} onClick={handleDelCategoryClick}>Submit</button>
              </form>
            </div>
            <div className={styles.Column}>
              <h5 className={styles.Title}>Delete Product</h5>
              <form>
                <label className={styles.Label}>Produtc Name </label>
                <select className={styles.Select} name="product" id="product" onChange={handleDelProductChange} required>
                  {productAll.map((product) => (
                    <option key={product.pid} value={product.name}>{product.name}</option>
                  ))}
                </select>
                <br></br>
                <input type="hidden" name="nonce" value={nonce} />
                <button className={styles.Submit} onClick={handleDelProductClick}>Submit</button>
              </form>
            </div>
          </div>
          <br></br>
          <div className={styles.Row}>
            <div className={styles.Column}>
              <h5 className={styles.Title}>Update Category</h5>
              <form>
                <label className={styles.Label}>Category Name </label>
                <select className={styles.Select} name="oldCategory" id="oldCategory" onChange={handleOldCategoryChange} required>
                  {categoryAll.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <br />
                <label className={styles.Label}>Update Category Name</label>
                <input type="text" id="updateCategory" name="updateCategory" value={updateCategory} onChange={handleUpdateCategoryChange} required />
                <br></br>
                <input type="hidden" name="nonce" value={nonce} />
                <button className={styles.Submit} onClick={handleUpdateCategory}>Submit</button>
              </form>
            </div>
            <div className={styles.Column}>
              <h5 className={styles.Title}>Update Product</h5>
              <form>
                <label className={styles.Label}>Category Name </label>
                <select className={styles.Select} name="oldProduct" id="oldProduct" onChange={handleOldProductChange} required>
                  {productAll.map((category) => (
                    <option key={category.name} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <br />
                <label className={styles.Label}>Update Item </label>
                <select className={styles.Select} name="updateItem" id="updateItem" onChange={handlUpdateItemChange} required>
                  <option key='name' value='name'>name</option>
                  <option key='price' value='price'>price</option>
                  <option key='description' value='description'>description</option>
                  <option key='inventory' value='inventory'>inventory</option>
                  <option key='image' value='image'>image</option>
                </select>
                <br />
                <label className={styles.Label}>Update Value </label>
                {(updateItem === 'description') ? <textarea type="text" id="updateDescription" name="updateDescription" onChange={handleUpdateDescriptionChange} required /> : null}
                {(updateItem === 'name') ? <input type="text" id="updateName" name="updateName" onChange={handleUpdateNameChange} required /> : null}
                {(updateItem === 'price') ? <input type="number" id="updatePrice" name="updatePrice" onChange={handleUpdatePriceChange} required /> : null}
                {(updateItem === 'inventory') ? <input type="number" id="updateInventory" name="updateInventory" onChange={handleUpdateInventoryChange} required /> : null}
                {(updateItem === 'image') ? <input className={styles.ImageButton} type="file" id="updateImage" name="updateImage" accept="image/jpeg, image/gif, image/png" onChange={handleUpdateImageChange} required /> : null}
                <br />
                <input type="hidden" name="nonce" value={nonce} />
                <button className={styles.Submit} onClick={handleUpdateProduct}>Submit</button>
              </form>
            </div>
          </div>
        </dir>
      </body>
    </div>
  );
}
