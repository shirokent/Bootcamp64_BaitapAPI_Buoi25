// ----- Hàm bật/tắt loading -----
function turnOnLoading() {
  document.getElementById("spinner").style.display = "block";
}
function turnOffLoading() {
  document.getElementById("spinner").style.display = "none";
}
// ----- Hàm reset form input -----
function resetForm() {
  var listInput = document.querySelectorAll("input");
  console.log("listInput", listInput);
  for (var i = 0; i < listInput.length; i++) {
    listInput[i].value = "";
  }
}

var idEdited = null;

// ----- Hàm xuất dữ liệu lên trang web -----
function renderProducts(productArray) {
  var contentHTML = "";
  for (var i = 0; i < productArray.length; i++) {
    var product = productArray[i];
    var trString = `
    <tr>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.img}</td>
    <td>${product.desc}</td>
    <td>
    <button onclick = deleteProduct(${product.id}) class = "btn btn-danger">Xóa</button>
    <button onclick = editProduct(${product.id}) class = "btn btn-primary">Edit</button>
    </td>
    </tr>
    `;
    contentHTML = contentHTML + trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
// ----- Hàm lấy thông tin người dùng từ server -----
function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://65a42889a54d8e805ed489c7.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      console.log(res.data);
      renderProducts(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      console.log(err);
      turnOffLoading();
    });
}
fetchProductList();
// ----- Hàm xóa dữ liệu người dùng -----
function deleteProduct(id) {
  turnOnLoading();
  axios({
    url: `https://65a42889a54d8e805ed489c7.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      fetchProductList();
      console.log(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      turnOffLoading();
      console.log(err.data);
    });
}
// ----- Hàm thêm mới 1 sp -----
function createProduct() {
  turnOnLoading();
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;
  var moTaSp = document.getElementById("moTaSP").value;
  var sp = {
    name: tenSp,
    price: giaSp,
    img: hinhSp,
    desc: moTaSp,
  };
  axios({
    url: "https://65a42889a54d8e805ed489c7.mockapi.io/product",
    method: "POST",
    data: sp,
  })
    .then(function (res) {
      console.log(res);
      fetchProductList();
      $("#myModal").modal("hide");
      resetForm();
    })
    .catch(function (err) {
      turnOffLoading();
      console.log(err);
    });
}
// ----- Hàm chỉnh sửa dữ liệu sp -----
function editProduct(id) {
  turnOnLoading();
  idEdited = id;
  axios({
    url: `https://65a42889a54d8e805ed489c7.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log(res.data);
      $("#myModal").modal("show");
      var sp = res.data;
      document.getElementById("TenSP").value = sp.name;
      document.getElementById("GiaSP").value = sp.price;
      document.getElementById("HinhSP").value = sp.img;
      document.getElementById("moTaSP").value = sp.desc;
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      turnOffLoading();
    });
}
// ----- Hàm cập nhật thông tin người dùng -----
function updateProduct() {
  turnOnLoading();
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;
  var moTaSp = document.getElementById("moTaSP").value;
  var sp = {
    name: tenSp,
    price: giaSp,
    img: hinhSp,
    desc: moTaSp,
  };
  axios({
    url: `https://65a42889a54d8e805ed489c7.mockapi.io/product/${idEdited}`,
    method: "PUT",
    data: sp,
  })
    .then(function (res) {
      console.log(res);
      $("#myModal").modal("hide");
      fetchProductList();
    })
    .catch(function (err) {
      console.log(err);
      turnOffLoading();
    });
}
