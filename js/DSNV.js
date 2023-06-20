function DSNV () {
  this.arr = []
  this.themNV = function (nhanVien) {
    this.arr.push(nhanVien)
  }
  this.timNV = function (taiKhoan) {
    for (var i = 0; i < this.arr.length; i++) {
      var tk = this.arr[i].taiKhoan
      if (tk == taiKhoan) {
        return i
      }
    }
    return -1
  }
  this.xoaNV = function (taiKhoan) {
    var index = this.timNV (taiKhoan)
    if (index != -1) {
      this.arr.splice(index,1)
    }
  }

  this.capNhatNV = function (nhanVien) {
    var index = this.timNV(nhanVien.taiKhoan)
    if (index != -1) {
      this.arr[index] = nhanVien
    }
  }
}