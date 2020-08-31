X++ = X+=1



function checkemail() {
    return true
    // 可改成'AAA'測試
}


// 主要測試if(裡面可放任何，ex:布林值、數值、字串)

// Falsy values
// 還記得嗎？在運算子有提到過的，JavaScript 只有對下面這些值會判斷為 false 其他都是 true：

// 布林值 false
// undefined
// null
// 數值 0
// NaN
// 空字串 ''

var emailCheck = checkemail();
if (emailCheck) {
    alert('email is legal!')
}

if (!(emailCheck)) {
    alert('email is illegal!')
}