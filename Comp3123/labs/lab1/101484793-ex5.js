function array_max_sum(arr, k) {
    if (k > arr.length) return null;

    let maxSum = 0;
    let currentSum = 0;

    for (let i = 0; i < k; i++) {
        currentSum += arr[i];
    }
    maxSum = currentSum;

    for (let i = k; i < arr.length; i++) {
        currentSum += arr[i] - arr[i - k];
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }
    return maxSum;
}

console.log(array_max_sum([1, 2, 3, 14, 5], 2));
console.log(array_max_sum([2, 3, 5, 1, 6], 3));
console.log(array_max_sum([9, 3, 5, 1, 7], 2));