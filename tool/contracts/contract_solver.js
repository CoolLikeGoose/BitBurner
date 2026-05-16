/** @param {NS} ns **/
export function solveContract(ns, type, data) {
    switch (type) {
        case "Array Jumping Game":
            return arrayJumpingGame(data);
        case "Merge Overlapping Intervals":
            return mergeOverlappingIntervals(data);
        case "Algorithmic Stock Trader I":
            return algorithmicStockTraderI(data);
        case "Spiralize Matrix":
            return spiralizeMatrix(data);
        case "Total Ways to Sum":
            return totalWaystoSum(data);
        case "Find Largest Prime Factor":
            return findLargestPrimeFactor(data);
        case "Minimum Path Sum in a Triangle":
            return mMinimumPathSuminaTriangle(data);

        default:
            return null;
    }
}

function mMinimumPathSuminaTriangle(data) {
	for (let i = 1; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			let left = Infinity;
			let right = Infinity;

			if (j != 0) left = data[i-1][j-1];
			if (j != data[i].length-1) right = data[i-1][j];
			
			data[i][j] += Math.min(left, right);
		}
	}

	return Math.min(...data[data.length - 1])
}

function findLargestPrimeFactor(data) {
	let factor = 2;
	let lastFactor = 1;

	while (factor * factor <= data) {
		if (data % factor === 0) {
			lastFactor = factor;
			data = data / factor;
			
			while (data % factor === 0) {
				data = data / factor;
			}
		}
		factor = (factor === 2) ? 3 : factor + 2;
	}

	return data > 1 ? data : lastFactor;
}

function totalWaystoSum(data) {
	const dp = Array(data+1).fill(0);
	dp[0] = 1;

	for (let num = 1; num <= data; num++) {
		for (let s = num; s <= data; s++) {
			dp[s] += dp[s-num];
		}
	}

	return dp[data]-1;
}

function spiralizeMatrix(data) {
	let left = 0;
	let right = data[0].length-1;
	let top = 0;
	let bottom = data.length-1;

	let result = [];

	while ((left <= right) && (top <= bottom)) {
		for (let i = left; i <= right; i++) {
			result.push(data[top][i]);
		}
		top++;

		for (let i = top; i <= bottom; i++) {
			result.push(data[i][right]);
		}
		right--;

		if (top <= bottom) {
			for (let i = right; i >= left; i--) {
				result.push(data[bottom][i]);
			}
			bottom--;
		}

		if (left <= right) {
			for (let i = bottom; i >= top; i--) {
				result.push(data[i][left]);
			}
			left++;
		}
	}

	return result;
}

function arrayJumpingGame(data) {
	let maxReach = 0;

	for (let i = 0; i < data.length; i++) {
		if (i > maxReach) return 0;
		maxReach = Math.max(maxReach, i + data[i]);
		if (maxReach >= data.length-1) return 1;
	}
	
	return 0;
}

function mergeOverlappingIntervals(data) {
	data.sort((a,b) => a[0] - b[0]);

	const result = [];
	let current = data[0];

	for (let i = 1; i < data.length; i++) {
		const next = data[i];

		if (next[0] <= current[1]) {
			current[1] = Math.max(current[1], next[1]);
		} else {
			result.push(current);
			current = next;
		}
	}

	result.push(current);
	return result;
}

function algorithmicStockTraderI(data) {
	let minPrice = Infinity;
	let maxProfit = 0;

	for (let price of data) {
		minPrice = Math.min(minPrice, price);
		maxProfit = Math.max(maxProfit, price - minPrice)
	}

	return maxProfit;
}