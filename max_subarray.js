/* maximum subarray problem
 * Given an array of numbers A[min..max], find a subarray A[i..j] where min <= i <= j <= max whose values have the largest sum.
 * ie. A = [-1,-2,-3,2,2,-1], A[3..4] is the max subarray as it gives the largest sum 4
 */

// create input array
var A = [];
var INPUT_SIZE=10;
for (var x=0; x<INPUT_SIZE; x++){
	var sign = 1;
	if (Math.random() > 0.5){
		sign = -1;
	}
	A.push(sign * Math.floor(Math.random() * 9 + 1));	
}
console.log("Input array [" + A.toString() + "]");

/* brute force algorithm
 * Computes the sum of values between all possible pairs of elements and finds the maxima.  
 * Ignores inverse pair. ie. (x1,x2) and (x2,x1) both yield same answer so doing one is enough.
 * n choose 2 = O(n^2) complexity
 *
 * arguments: 
 *   A - input Array
 * returns: 
 *   Object
 *	   first - first index of max subarray 
 *     last - last index ofo max subarray
 *     sum - sum of max subarray
 */
function max_subarray_brute(A){
	var sum, max_sum = Number.MIN_SAFE_INTEGER;
	for (var i=0; i<A.length; i++){
		sum = 0;
		for (var j=i; j<A.length; j++){
			sum += A[j];
			if (sum > max_sum){
				max_sum = sum;
				var first = i;
				var last = j;
			}
		}
	}
	return {first: first, last: last, sum: max_sum};
}
var res = max_subarray_brute(A);
console.log("Brute force alg found subarray A[" + res.first + ".." + res.last + "] yields max sum " + res.sum);

/* divide & conquer algorithm
 * Recursively divides the input array into halves.  
 * Computes the max subarray for the 3 cases where a max subarray
 * could occur: 
 * 		1. left subarray - the left half of the subproblem. ie. A[first..mid]
 * 		2. right subarray - the right half of the subproblem. ie. A[mid+1..last]
 *		3. crossing subarray - a subarray containing elements from both the left and right subarray. ie. A[first,..,mid,..,last]
 * O(nlgn) complexity
 *
 * arguments:
 *   A - input Array
 *   f - first element index of A
 *   l - last element index of A
 */
function max_subarray_dac(A, f, l){
	// console.log("f:l " + f + ":" + l);
	if (f == l){ // 1 element subarray
		return {first: f, last: l, sum: A[f]};
	}
	var mid = f + Math.floor((l-f)/2);
	var max_left = max_subarray_dac(A, f, mid);
	var max_right = max_subarray_dac(A, mid+1, l);
	var max_crossing = max_crossing_subarray(A, f, mid, l);
	if (max_left.sum >= max_right.sum && max_left.sum >= max_crossing.sum){
		return max_left;
	}else if (max_right.sum >= max_left.sum && max_right.sum >= max_crossing.sum){
		return max_right;
	}else{
		return max_crossing;
	}
}

/* arguments:
 *   A - input Array
 *   f - first element index of A
 *   m - middle element index of A
 *   l - last element index of A
 * returns:
 *   Object
 *     first - first index of max subarray
 *     last - last index of max subarray
 *     sum - sum of max subarray
 */
function max_crossing_subarray(A, f, m, l){
	var left_sum = Number.MIN_SAFE_INTEGER, sum = 0;
	for (var i=m; i>=0; i--){
		sum += A[i];
		if (sum > left_sum){
			left_sum = sum;
			var max_first = i;
		}
	}
	right_sum = Number.MIN_SAFE_INTEGER;
	sum = 0;
	for (i=m+1; i<A.length; i++){
		sum += A[i];
		if (sum > right_sum){
			right_sum = sum;
			var max_last = i;
		}
	}
	return {first: max_first, last: max_last, sum: left_sum + right_sum};
}

var res2 = max_subarray_dac(A, 0, A.length-1);
console.log("Divide & conquer alg found subarray A[" + res2.first + ".." + res2.last + "] yields max sum " + res2.sum);