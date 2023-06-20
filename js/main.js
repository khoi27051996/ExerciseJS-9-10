function getElement(selector) {
  return document.querySelector(selector);
}

var dsnv = new DSNV();
getLocal();

function thongTinNV(isEdit) {
  var taiKhoan = getElement("#tknv").value;
  var hoVaTen = getElement("#name").value;
  var email = getElement("#email").value;
  var matKhau = getElement("#password").value;
  var ngayLam = getElement("#datepicker").value;
  var luongCB = getElement("#luongCB").value;
  var chucVu = getElement("#chucvu").value;
  var gioLam = getElement("#gioLam").value;

  var nhanVien = new NhanVien(
    taiKhoan,
    hoVaTen,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam
  );

  var isValid = true;

  // Kiểm tra tải khoản
  isValid &=
    kiemTraTK(
      nhanVien.taiKhoan,
      dsnv.arr,
      isEdit,
      "#tbTKNV",
      "Tai Khoan da ton tai"
    ) &&
    kiemTraChuoi(
      nhanVien.taiKhoan,
      1,
      undefined,
      "#tbTKNV",
      "Tài khoản không được để trống"
    ) &&
    kiemTraChuoi(
      nhanVien.taiKhoan,
      6,
      10,
      "#tbTKNV",
      "Tài khoản gồm 6 đến 10 ký tự"
    );

  // Kiểm Tra Tên :
  isValid &=
    kiemTraChuoi(
      nhanVien.hoVaTen,
      1,
      undefined,
      "#tbTen",
      "Tên không được để trống"
    ) &&
    kiemTraPattern(
      nhanVien.hoVaTen,
      /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
      "#tbTen",
      "Họ Và Tên phải là chữ không chứa số"
    );

  //Kiểm Tra Email:
  isValid &=
    kiemTraChuoi(
      nhanVien.email,
      1,
      undefined,
      "#tbEmail",
      "Email không được để trống"
    ) &&
    kiemTraPattern(
      nhanVien.email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "#tbEmail",
      "Email không đúng định dạng"
    );

  //Kiểm tra Mật Khẩu:
  isValid &=
    kiemTraChuoi(
      nhanVien.matKhau,
      1,
      undefined,
      "#tbMatKhau",
      "Mật khẩu không được để trống"
    ) &&
    kiemTraChuoi(
      nhanVien.matKhau,
      6,
      10,
      "#tbMatKhau",
      "Mật khẩu gồm 6 đến 10 ký tự"
    ) &&
    kiemTraPattern(
      nhanVien.matKhau,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
      "#tbMatKhau",
      "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biết"
    );

  //Kiểm Tra Ngày Làm
  isValid &=
    kiemTraChuoi(
      nhanVien.ngayLam,
      1,
      undefined,
      "#tbNgay",
      "Ngày làm không để trống"
    ) &&
    kiemTraPattern(
      nhanVien.ngayLam,
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/,
      "#tbNgay",
      "Định dang theo MM/DD/YYYY"
    );

  //Kiểm tra chức vụ

  isValid &= checkCV(nhanVien.chucVu, "#tbChucVu", "Vui lòng chọn chức vụ");

  //Kiểm Tra Lương CB :
  isValid &=
    kiemTraChuoi(
      nhanVien.luongCB,
      1,
      undefined,
      "#tbLuongCB",
      "Lương không được để trống"
    ) &&
    kiemTraPattern(
      nhanVien.luongCB,
      /^[0-9]+$/,
      "#tbLuongCB",
      "Lương phải là con số"
    ) &&
    kiemTraLuong(
      nhanVien.luongCB,
      1e6,
      20e6,
      "#tbLuongCB",
      "Lương cơ bản từ 1.000.000 đến 20.000.000"
    );
  //Kiểm Tra gio làm:
  isValid &=
    kiemTraChuoi(
      nhanVien.gioLam,
      1,
      undefined,
      "#tbGiolam",
      "Giờ làm không được để trống"
    ) &&
    kiemTraPattern(
      nhanVien.gioLam,
      /^[0-9]+$/,
      "#tbGiolam",
      "Giờ làm phải là số "
    ) &&
    kiemTraLuong(
      nhanVien.gioLam,
      80,
      200,
      "#tbGiolam",
      "Giờ làm trong tháng từ 80 đến 200 giờ"
    );
  return isValid ? nhanVien : undefined;
}

//Thêm nhân viên
getElement("#btnThemNV").onclick = function () {
  var nhanVien = thongTinNV(false);
  if (nhanVien) {
    dsnv.themNV(nhanVien);
    renderNV();
    setLocal();
    resetForm();
  }
};
//Hiển thị nv
function renderNV(arrSearch = dsnv.arr) {
  var content = [];
  for (var i = 0; i < arrSearch.length; i++) {
    var nv = arrSearch[i];
    content += `<tr>
    <td>${nv.taiKhoan}</td>
    <td>${nv.hoVaTen}</td>
    <td>${nv.email}</td>
    <td>${nv.ngayLam}</td>
    <td>${nv.chucVu}</td>
    <td>${nv.tinhLuong()}</td>
    <td>${nv.xepHang()}</td>
    <td>
    <button class = "btn btn-success" data-toggle="modal"  data-target="#myModal" onclick = "hienThiNV ('${
      nv.taiKhoan
    }')" >Edit</button>
    <button class = "btn btn-dark" onclick = "delNV ('${
      nv.taiKhoan
    }')" >Del</button>
    </td>
    </tr>
    `;
  }
  getElement("#tableDanhSach").innerHTML = content;
}
//Event Rs form
function resetForm() {
  getElement("#fromList").reset();
}

//Lưu Local
function setLocal() {
  localStorage.setItem("DsNhanVien", JSON.stringify(dsnv.arr));
}

//Đọc dữ liệu local khi rs web
function getLocal() {
  var data = localStorage.getItem("DsNhanVien");
  if (data) {
    var parseData = JSON.parse(data);
    var arrNEW = [];
    for (var i = 0; i < parseData.length; i++) {
      var nv = parseData[i];
      var newNV = new NhanVien(
        nv.taiKhoan,
        nv.hoVaTen,
        nv.email,
        nv.matKhau,
        nv.ngayLam,
        nv.luongCB,
        nv.chucVu,
        nv.gioLam
      );
      arrNEW.push(newNV);
    }
    dsnv.arr = arrNEW;
    renderNV();
  }
}

//Xóa nhân viên
function delNV(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  renderNV();
  setLocal();
}

//Hiện thị để thông tin nv
function hienThiNV(taiKhoan) {
  var index = dsnv.timNV(taiKhoan);
  var nv = dsnv.arr[index];
  getElement("#tknv").value = nv.taiKhoan;
  getElement("#name").value = nv.hoVaTen;
  getElement("#email").value = nv.email;
  getElement("#password").value = nv.matKhau;
  getElement("#datepicker").value = nv.ngayLam;
  getElement("#luongCB").value = nv.luongCB;
  getElement("#chucvu").value = nv.chucVu;
  getElement("#gioLam").value = nv.gioLam;
}

//Cập nhật nhân viên
getElement("#btnCapNhat").onclick = function () {
  var nhanVienNEW = thongTinNV(true);
  dsnv.capNhatNV(nhanVienNEW);
  renderNV();
  setLocal();
};

//Tìm kiếm nhân Viên

getElement("#searchName").addEventListener("keyup", function () {
  var searchName = getElement("#searchName").value.toLowerCase();
  var arrSearch = [];
  for (var i = 0; i < dsnv.arr.length; i++) {
    var xepLoai = dsnv.arr[i].xepHang().toLowerCase();
    if (xepLoai.indexOf(searchName) !== -1) {
      arrSearch.push(dsnv.arr[i]);
    }
  }
  renderNV(arrSearch)
});
