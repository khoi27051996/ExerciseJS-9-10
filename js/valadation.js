/**
 *
 * @param  value  : Giá trị cần kiểm tra
 * @param  minLength  : Độ dài nhỏ nhất
 * @param  maxLength : Độ dài lớn nhất
 * @param  selector : Thẻ hiển thị lỗi
 * @param  messErr : Thông báo lỗi
 */
function kiemTraChuoi(value, minLength, maxLength, selector, messErr) {
  if (value.trim().length <= minLength || value.trim().length >= maxLength) {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else {
    getElement(selector).style.display = "none";
    return true;
  }
}

function kiemTraLuong(value, minLength, maxLength, selector, messErr) {
  if (value * 1 <= minLength || value * 1 >= maxLength) {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else {
    getElement(selector).style.display = "none";
    return true;
  }
}

function kiemTraPattern(value, pattern, selector, messErr) {
  if (!pattern.test(value)) {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else {
    getElement(selector).style.display = "none";
    return true;
  }
}

function checkCV(value, selector, messErr) {
  if (value == "Select") {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else {
    getElement(selector).style.display = "none";
    return true;
  }
}

function kiemTraTK (taiKhoan, dssv, isEdit ,selector, messErr) {
  if (isEdit) return true
  var isFlag = true
  for (var i = 0; i < dssv.length; i++) {
      if (dssv[i].taiKhoan == taiKhoan){
          isFlag = false
          break;
      }
  }
  if (isFlag) {
      getElement(selector).innerHTML = ''
      return true
  } 
  if (!isFlag) {
      getElement(selector).style.display = 'block'
      getElement(selector).innerHTML = messErr
      return false
  }
}
