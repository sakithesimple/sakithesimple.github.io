document.addEventListener("DOMContentLoaded", function() {
    let track = document.querySelector(".card-subtitle");
    let result = document.querySelector(".card-title");
    let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let plus, minus, multiply, divide;
    let decimal;
    let clear, backspace, equals;
    let allButtons = document.querySelectorAll(".btn");
    clear = allButtons[0];
    backspace = allButtons[1];
    equals = allButtons[2];
    digits[0] = allButtons[13];
    for (let i = 3; i < 12; i++)
    {
        digits[i - 2] = allButtons[i];
    }
    plus = allButtons[12];
    minus = allButtons[15];
    multiply = allButtons[14];
    divide = allButtons[17];
    decimal = allButtons[16];
    let answer = 0;
    let tracked = 0;
    let operating = null;
    let isDecimal = false;
    let decimalPlaces = 1;
    let decimalIndex = 0;
    let biggestDecimalIndex = 0;
    function update(newAnswer)
    {
        answer = newAnswer;
        result.innerHTML = answer.toFixed(decimalIndex);
    }
    function pushAnswerToTop(operator)
    {
        tracked = answer + 0;
        track.innerHTML = tracked.toFixed(decimalIndex) + " " + operator;
        update(0);
    }
    function solve()
    {
        decimalIndex = biggestDecimalIndex + 0;
        if (operating != null && operating != "dunno")
        {
            track.innerHTML = tracked.toFixed(decimalIndex) + " " + operating + " " + answer.toFixed(decimalIndex);
        }
        else
        {
            tracked = 0;
            track.innerHTML = 0;
            update(answer);
        }
        if (operating == "+")
        {
            update(answer + tracked);
            tracked = 0;
        } else if (operating == "-")
        {
            update(tracked - answer);
            tracked = 0;
        } else if (operating == "x")
        {
            update(tracked * answer);
            tracked = 0;
        } else if (operating == "/")
        {
            isDecimal = true;
            biggestDecimalIndex = 15;
            decimalIndex = 10;
            decimalPlaces = 1000000000000000;
            update(tracked / answer);
            tracked = 0;
        }
        operating = null;
    }
    function equalImplicitly()
    {
        if (operating != "dunno")
        {
            solve();
        }
    }
    function restoreDecimals()
    {
        decimalIndex = 0;
        decimalPlaces = 1;
        isDecimal = false;
    }
    plus.addEventListener("click", function() {
        equalImplicitly();
        pushAnswerToTop("+");
        operating = "+";
        restoreDecimals();
    });
    minus.addEventListener("click", function() {
        equalImplicitly();
        pushAnswerToTop("-");
        operating = "-";
        restoreDecimals();
    });
    multiply.addEventListener("click", function() {
        equalImplicitly();
        pushAnswerToTop("x");
        operating = "x";
        restoreDecimals();
    });
    divide.addEventListener("click", function() {
        equalImplicitly();
        pushAnswerToTop("/");
        operating = "/";
        restoreDecimals();
    });
    for (let i = 0; i < digits.length; i++)
    {
        digits[i].addEventListener("click", function() {
            if (operating == null)
            {
                update(i);
                operating = "dunno";
            }
            else 
            {
                if (!isDecimal)
                {
                    update((answer*10) + i);
                }
                else
                {
                    update(answer + (i / decimalPlaces));
                    if (decimalIndex > biggestDecimalIndex)
                    {
                        biggestDecimalIndex = decimalIndex + 0;
                    }
                    decimalPlaces *= 10;
                    decimalIndex++;
                }
            }
        });
    }
    backspace.addEventListener("click", function() {
        update((answer - (answer%10)) / 10);
        if (operating == null)
        {
            operating = "dunno";
        }
    });
    equals.addEventListener("click", function() {
        solve();
    });
    clear.addEventListener("click", function() {
        tracked = 0;
        track.innerHTML = 0;
        restoreDecimals();
        isDecimal = false;
        update(0);
        operating = null;
        biggestDecimalIndex = 0;
    });
    decimal.addEventListener("click", function() {
        isDecimal = true;
        decimalPlaces *= 10;
        decimalIndex++;
    });
});