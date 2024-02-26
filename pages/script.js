const DropImage = document.getElementById("dropImage");
const ProductImage = document.getElementById("productImage");
const ImageView = document.getElementById("imageView");

ProductImage.addEventListener("change", uploadImage);

function uploadImage() {
    let imgLink = URL.createObjectURL(ProductImage.file[0]);
    ImageView.style.backgroundImage = `url(${imgLink})`;
}