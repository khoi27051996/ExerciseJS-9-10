function NhanVien(
  _taiKhoan,
  _hoVaTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan
  this.hoVaTen = _hoVaTen
  this.email = _email
  this.matKhau = _matKhau
  this.ngayLam = _ngayLam
  this.luongCB = _luongCB
  this.chucVu = _chucVu
  this.gioLam = _gioLam
  this.tinhLuong = function () {
    if (this.chucVu == 'Select') return alert('Vui lòng chọn chức vụ')
    if (this.chucVu == 'Boss') return this.luongCB*1 * 3
    if (this.chucVu == 'Manager') return this.luongCB*1 * 2
    if (this.chucVu == 'Staff') return this.luongCB*1
  }
  this.xepHang = function () {
    if (this.gioLam*1 >= 192) return 'Xuất Sắc'
    if (this.gioLam*1 >= 176) return 'Giỏi'
    if (this.gioLam*1 >= 160) return 'Khá'
    return 'Trung Bình'
  }
}
