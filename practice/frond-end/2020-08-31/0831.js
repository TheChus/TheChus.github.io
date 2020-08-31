var counter = 0;
for (var i = 0; i < 5; i++) {
    if (i < 3) {
        continue;
    }
    counter += i;
}

// 以上是012忽略，3+4而已



var fruitType = Oranges;
switch (fruitType) {
    case 'Oranges':
        alert('Oranges');
        break;
    case 'Apples':
        alert('Apples');
        break;
    case 'Bananas':
        alert('Bananas');
        break;
    case 'Cherries':
        alert('Cherries');
        break;
    case 'Mangoes':
        alert('Mangoes');
        break;
    case 'Papayas':
        alert('Papayas');
        break;
    default:
        alert('沒有符合的條件');
}

// switch主要是分類用



// Function (這裡可以是0~多個參數,)


let denominator = 0;

// RangeError: Attempted division by zero!
try {
    if (denominator === 0) {
        throw new RangeError("Attempted division by zero!");
    }
} catch (e) {
    console.log(e.name + ': ' + e.message)
}

console.log("end!");


// 倒數計時課堂範例回想：(未成功…又忘記了= =)

var countdown = 10;

while ( countdown < 11 ) {
    countdown--;
    x = countdown;
    $(#countdown).text(x);
    sleep(1);

    if (countdown === 0) {
        break;
    }
  }