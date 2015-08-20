/* maximum subarray problem
 * Given an array of numbers A[min..max], find a subarray A[i..j] where min <= i < j <= max whose values have the largest sum.
 * ie. A = [-1,-2,-3,2,2,-1], A[3..4] is the max subarray as it gives the largest sum 4
 */

// create input array
var A = [];
var INPUT_SIZE=6;
for (var x=0; x<INPUT_SIZE; x++){
	var sign = 1;
	if (Math.random() > 0.5){
		sign = -1;
	}
	A.push(sign * Math.floor(Math.random() * 9 + 1));	
}

/* brute force algorithm
 * Computes the sum of values between all possible pairs of elements and finds the maxima.  
 * Ignores inverse pair. ie. (x1,x2) and (x2,x1) both yield same answer so doing one is enough.
 * n choose 2 = O(n^2) complexity
 */
var sum, max_sum = Number.MIN_SAFE_INTEGER;
for (var i=0; i<A.length; i++){
	sum = A[i];
	for (var j=i+1; j<A.length; j++){
		sum += A[j];
		if (sum > max_sum){
			max_sum = sum;
			var min = i;
			var max = j;
		}
	}
}
console.log("For array [" + A.toString() + "], subarray A[" + min + ".." + max + "] yields max sum " + max_sum);