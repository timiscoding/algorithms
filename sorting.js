// create unsorted array
A = [];
A.size = 10;
for (var i=1; i <= A.size; i++){
	A.push(i);
}
// console.log(A.toString());
shuffle(A).toString();
// console.log(A.toString());

function Bench(){}
Bench.prototype.start_time = 0;
Bench.prototype.stop_time = 0;
Bench.prototype.start = function(){start_time = new Date().getTime()};
Bench.prototype.stop = function(){stop_time = new Date().getTime()};
Bench.prototype.time = function(){return stop_time - start_time;};

var A1 = A.slice();
var bench = new Bench();
console.log("Begin merge sort"); // + " on: " + A1.toString());
bench.start();
merge_sort(A1, 0, A1.length - 1);
bench.stop();
console.log("Took " + bench.time() + "ms "); // + A1.toString()

var A2 = A.slice();
console.log("Begin selection sort"); // + " on: " + A2.toString());
bench.start();
selection_sort(A2);
bench.stop();
console.log("Took " + bench.time() + "ms "); // + A2.toString());

var A3 = A.slice();
console.log("Begin insertion sort"); // + " on: " + A3.toString());
bench.start();
insertion_sort(A3);
bench.stop();
console.log("Took " + bench.time() + "ms"); // + A3.toString());

// shuffle an array
function shuffle(o){
	for (var i, j=o.length, k; j; k=Math.floor(Math.random() * o.length), i=o[--j], o[j]=A[k], o[k]=i){} 
	return o;
}

// A: input array, f: first element index, l: last element index
function merge_sort(A, f, l){
	if (f == l){ // 1 element subarray
		return;
	}
	var m = Math.floor((l - f) / 2) + f;
	merge_sort(A, f, m);
	merge_sort(A, m+1, l);
	merge(A, f, m, l);
	
}

// A: input array, f: first element index, m: middle element index, l: last element index
function merge(A, f, m, l){
	var L=[], R=[]; // Left subarray, Right subarray
	L_len = m - f + 1;
	R_len = l - m;
	merge_len = l - f + 1;
	for (var i=f; i-f<L_len; i++){
		L.push(A[i]);
	}
	for (i=m+1; i-m-1<R_len; i++){
		R.push(A[i]);
	}
	var j=0, k=0;
	for (i=f; i-f<merge_len; i++){
		if (j == L.length){
			A[i] = R[k++];
		}else if (k == R.length){
			A[i] = L[j++];
		}else if (L[j] <= R[k]){
			A[i] = L[j++];
		}else{
			A[i] = R[k++];
		}
	}
}

// selection sort
function selection_sort(A){
	for (var i=0; i<A.length-1; i++){ // after 2nd last item, the last item will be swapped into right position
		for (var j=i+1; j<A.length; j++){
			if (A[j] < A[i]){
				var small = j;
			}
		}
		var tmp = A[small];
		A[small] = A[i];
		A[i] = tmp;
	}
}

// insertion in-place sort
function insertion_sort(A){
	for (var j=1; j<A.length; j++){ // skip first item as it is in sorted subarray
		var key = A[j];
		var i = j - 1;
		while (i >= 0 && A[i] > key){
			A[i+1] = A[i];
			i--;
		}
		A[i+1] = key;
	}
}


