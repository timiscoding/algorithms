var res = [];       // holds all permutations
var tmp = [];       // a permutation is gradually built up here

// Given an array of characters, finds all permutations of a string.
// eg. permute([1,2,3]) would result in [ '123', '132', '213', '231', '312', '321' ]
// ar - array of characters to permute
// all permutations are stored in res, 1 permutation per element
function permute(ar){   // array of characters to permute
    for (var i=0; i<ar.length; i++){
        var cp = ar.slice();                // preserve original array for next iteration
        var ch = cp.splice(i,1)[0];         // store first char and remove it from copied array
        tmp.push(ch);
        if (cp.length === 0){
            res.push(tmp.join(''));
            tmp.pop();
        }else {
            permute(cp);
            tmp.pop();
        }
    }
}

function factorial(num){
    if (num === 1){
        return 1;
    }
    return num * factorial(num - 1);
}