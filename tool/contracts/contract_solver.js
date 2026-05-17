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
		case "Encryption I: Caesar Cipher":
			return encryptionICaesarCipher(data);
		case "Largest Rectangle in a Matrix":
			return largestRectangleinaMatrix(data);
		case "Subarray with Maximum Sum": 						// 10
			return subarraywithMaximumSum(data);
		case "Algorithmic Stock Trader II":
			return algorithmicStockTraderII(data);
		case "Unique Paths in a Grid I":
			return uniquePathsinaGridI(data);
		case "Encryption II: Vigenère Cipher":
			return encryptionIIVigenereCipher(data);
		case "Square Root":
			return squareRoot(data);
		case "Total Number of Primes":
			return totalNumberofPrimes(data);
		case "Generate IP Addresses":
			return generateIPAddresses(data);
		case "Unique Paths in a Grid II":
			return uniquePathsinaGridII(data);
		case "HammingCodes: Integer to Encoded Binary":
			return hammingCodesIntegertoEncodedBinary(data);
		case "Proper 2-Coloring of a Graph":
			return proper2ColoringofaGraph(data);
		case "Compression I: RLE Compression":				//20
			return compressionIRLECompression(data);
		case "Algorithmic Stock Trader III":
			return algorithmicStockTraderIII(data);
		case "Total Ways to Sum II":
			return totalWaystoSumII(data);
		case "Shortest Path in a Grid":
			return shortestPathinaGrid(data);
		case "Array Jumping Game II":
			return arrayJumpingGameII(data);
		case "Compression II: LZ Decompression":
			return compressionIILZDecompression(data);
		case "Compression III: LZ Compression":
			return compressionIIILZCompression(data);
		case "Find All Valid Math Expressions":
			return findAllValidMathExpressions(data);
		case "HammingCodes: Encoded Binary to Integer":
			return hammingCodesEncodedBinarytoInteger(data);
		case "Algorithmic Stock Trader IV":
			return algorithmicStockTraderIV(data);
		case "Sanitize Parentheses in Expression":	//30
			return sanitizeParenthesesinExpression(data);

		default:
			return null;
	}
}

function sanitizeParenthesesinExpression(data) {
	const s = data;
	const res = new Set();

	let leftRem = 0, rightRem = 0;
	for (const ch of s) {
		if (ch === '(') {
			leftRem++;
		} else if (ch === ')') {
			if (leftRem > 0) leftRem--;
			else rightRem++;
		}
	}

	function dfs(index, path, leftCount, rightCount, leftRem, rightRem) {
		if (index === s.length) {
			if (leftRem === 0 && rightRem === 0 && leftCount === rightCount) {
				res.add(path);
			}
			return;
		}

		const ch = s[index];

		if (ch === '(') {
			if (leftRem > 0) {
				dfs(index + 1, path, leftCount, rightCount, leftRem - 1, rightRem);
			}
			dfs(index + 1, path + ch, leftCount + 1, rightCount, leftRem, rightRem);
		} else if (ch === ')') {
			if (rightRem > 0) {
				dfs(index + 1, path, leftCount, rightCount, leftRem, rightRem - 1);
			}
			if (rightCount < leftCount) {
				dfs(index + 1, path + ch, leftCount, rightCount + 1, leftRem, rightRem);
			}
		} else {
			dfs(index + 1, path + ch, leftCount, rightCount, leftRem, rightRem);
		}
	}

	dfs(0, "", 0, 0, leftRem, rightRem);

	if (res.size === 0) return [""];
	return [...res];
}

function algorithmicStockTraderIV(data) {
	const k = data[0];
	const prices = data[1];
	const n = prices.length;

	if (n < 2 || k === 0) return 0;

	if (k >= Math.floor(n / 2)) {
		let profit = 0;
		for (let i = 1; i < n; i++) {
			if (prices[i] > prices[i - 1]) {
				profit += prices[i] - prices[i - 1];
			}
		}
		return profit;
	}

	const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0));

	for (let t = 1; t <= k; t++) {
		let best = -prices[0];
		for (let i = 1; i < n; i++) {
			dp[t][i] = Math.max(dp[t][i - 1], prices[i] + best);
			best = Math.max(best, dp[t - 1][i] - prices[i]);
		}
	}

	return dp[k][n - 1];
}

function hammingCodesEncodedBinarytoInteger(data) {
	const bits = data.split("").map(x => Number(x));
	const n = bits.length;

	const parityPos = [];
	for (let p = 0; (1 << p) < n; p++) parityPos.push(1 << p);
	parityPos.unshift(0);

	// --- parity check ---
	function checkParity(pos) {
		if (pos === 0) {
			let sum = 0;
			for (let i = 0; i < n; i++) sum ^= bits[i];
			return sum; // 0 = ok, 1 = error
		}

		let step = pos;
		let sum = 0;
		for (let i = pos; i < n; i += 2 * step) {
			for (let j = i; j < i + step && j < n; j++) {
				sum ^= bits[j];
			}
		}
		return sum; // 0 = ok, 1 = error
	}

	// compute syndrome
	let syndrome = 0;
	for (let p of parityPos) {
		if (checkParity(p) === 1) syndrome ^= p;
	}

	if (syndrome < n && syndrome >= 0) {
		bits[syndrome] ^= 1;
	}

	// extract data bits
	const paritySet = new Set(parityPos);
	const dataBits = [];
	for (let i = 0; i < n; i++) {
		if (!paritySet.has(i)) dataBits.push(bits[i]);
	}

	return parseInt(dataBits.join(""), 2);
}

function findAllValidMathExpressions(data) {
	const res = [];

	function dfs(index, expr, prev, curr) {
		if (index === data[0].length) {
			if (curr === data[1]) res.push(expr);
			return;
		}

		for (let i = index; i < data[0].length; i++) {
			if (i !== index && data[0][index] === '0') break;

			const part = data[0].slice(index, i + 1);
			const num = Number(part);

			if (index === 0) {
				dfs(i + 1, part, num, num);
			} else {
				dfs(i + 1, expr + "+" + part, num, curr + num);
				dfs(i + 1, expr + "-" + part, -num, curr - num);
				dfs(i + 1, expr + "*" + part, prev * num, curr - prev + prev * num);
			}
		}
	}

	dfs(0, "", 0, 0);
	return res;
}

// Algo from:
// https://github.com/devmount/bitburner-contract-solver/blob/main/utils.js#L38
// i spent too much time debugging my version
function compressionIIILZCompression(data) {
	// for state[i][j]:
	//      if i is 0, we're adding a literal of length j
	//      else, we're adding a backreference of offset i and length j
	let cur_state = Array.from(Array(10), () => Array(10).fill(null));
	let new_state = Array.from(Array(10), () => Array(10));

	function set(state, i, j, str) {
		const current = state[i][j];
		if (current == null || str.length < current.length) {
			state[i][j] = str;
		} else if (str.length === current.length && Math.random() < 0.5) {
			// if two strings are the same length, pick randomly so that
			// we generate more possible inputs to Compression II
			state[i][j] = str;
		}
	}

	// initial state is a literal of length 1
	cur_state[0][1] = "";

	for (let i = 1; i < data.length; ++i) {
		for (const row of new_state) {
			row.fill(null);
		}
		const c = data[i];

		// handle literals
		for (let length = 1; length <= 9; ++length) {
			const string = cur_state[0][length];
			if (string == null) {
				continue;
			}

			if (length < 9) {
				// extend current literal
				set(new_state, 0, length + 1, string);
			} else {
				// start new literal
				set(new_state, 0, 1, string + "9" + data.substring(i - 9, i) + "0");
			}

			for (let offset = 1; offset <= Math.min(9, i); ++offset) {
				if (data[i - offset] === c) {
					// start new backreference
					set(new_state, offset, 1, string + String(length) + data.substring(i - length, i));
				}
			}
		}

		// handle backreferences
		for (let offset = 1; offset <= 9; ++offset) {
			for (let length = 1; length <= 9; ++length) {
				const string = cur_state[offset][length];
				if (string == null) {
					continue;
				}

				if (data[i - offset] === c) {
					if (length < 9) {
						// extend current backreference
						set(new_state, offset, length + 1, string);
					} else {
						// start new backreference
						set(new_state, offset, 1, string + "9" + String(offset) + "0");
					}
				}

				// start new literal
				set(new_state, 0, 1, string + String(length) + String(offset));

				// end current backreference and start new backreference
				for (let new_offset = 1; new_offset <= Math.min(9, i); ++new_offset) {
					if (data[i - new_offset] === c) {
						set(new_state, new_offset, 1, string + String(length) + String(offset) + "0");
					}
				}
			}
		}

		const tmp_state = new_state;
		new_state = cur_state;
		cur_state = tmp_state;
	}

	let result = null;

	for (let len = 1; len <= 9; ++len) {
		let string = cur_state[0][len];
		if (string == null) {
			continue;
		}

		string += String(len) + data.substring(data.length - len, data.length);
		if (result == null || string.length < result.length) {
			result = string;
		} else if (string.length == result.length && Math.random() < 0.5) {
			result = string;
		}
	}

	for (let offset = 1; offset <= 9; ++offset) {
		for (let len = 1; len <= 9; ++len) {
			let string = cur_state[offset][len];
			if (string == null) {
				continue;
			}

			string += String(len) + "" + String(offset);
			if (result == null || string.length < result.length) {
				result = string;
			} else if (string.length == result.length && Math.random() < 0.5) {
				result = string;
			}
		}
	}

	return result ?? "";
}

function compressionIILZDecompression(data) {
	let out = "";
	let i = 0;
	let type = 1;

	while (i < data.length) {
		const L = data[i].charCodeAt(0) - 48;
		i++;

		if (L === 0) {
			type = 3 - type;
			continue;
		}

		if (type === 1) {
			out += data.slice(i, i + L);
			i += L;
		} else {
			const X = data[i].charCodeAt(0) - 48;
			i++;

			for (let k = 0; k < L; k++) {
				out += out[out.length - X];
			}
		}

		type = 3 - type;
	}

	return out;
}

function arrayJumpingGameII(data) {
	const n = data.length;
	if (n <= 1) return 0;
	if (data[0] == 0) return 0;

	let jumps = 0;
	let currentEnd = 0;
	let farthest = 0;

	for (let i = 0; i < n - 1; i++) {
		farthest = Math.max(farthest, i + data[i]);

		if (i == currentEnd) {
			jumps++;
			currentEnd = farthest;

			if (currentEnd >= n - 1) return jumps;
		}

		if (farthest <= i) return 0;
	}

	return 0;
}

function shortestPathinaGrid(data) {
	const R = data.length;
	const C = data[0].length;

	if (data[0][0] === 1 || data[R - 1][C - 1] === 1) return "";

	const dirs = [
		[-1, 0, 'U'],
		[1, 0, 'D'],
		[0, -1, 'L'],
		[0, 1, 'R']
	];

	const visited = Array.from({ length: R }, () => Array(C).fill(false));
	const parent = Array.from({ length: R }, () => Array(C).fill(null));

	const q = [[0, 0]];
	visited[0][0] = true;

	while (q.length) {
		const [r, c] = q.shift();

		if (r === R - 1 && c === C - 1) break;

		for (const [dr, dc, move] of dirs) {
			const nr = r + dr;
			const nc = c + dc;

			if (
				nr >= 0 && nr < R &&
				nc >= 0 && nc < C &&
				!visited[nr][nc] &&
				data[nr][nc] === 0
			) {
				visited[nr][nc] = true;
				parent[nr][nc] = { r, c, move };
				q.push([nr, nc]);
			}
		}
	}

	if (!visited[R - 1][C - 1]) return "";

	let path = "";
	let cr = R - 1;
	let cc = C - 1;

	while (!(cr === 0 && cc === 0)) {
		const p = parent[cr][cc];
		path += p.move;
		cr = p.r;
		cc = p.c;
	}

	return path.split("").reverse().join("");
}

function totalWaystoSumII(data) {
	const dp = Array(data[0] + 1).fill(0);
	dp[0] = 1;

	for (const v of data[1]) {
		for (let s = v; s <= data[0]; s++) {
			dp[s] += dp[s - v];
		}
	}

	return dp[data[0]];
}

function algorithmicStockTraderIII(data) {
	let buy1 = Infinity;
	let sell1 = 0;
	let buy2 = Infinity;
	let sell2 = 0;

	for (const p of data) {
		buy1 = Math.min(buy1, p);
		sell1 = Math.max(sell1, p - buy1);

		buy2 = Math.min(buy2, p - sell1);
		sell2 = Math.max(sell2, p - buy2);
	}

	return sell2;
}

function compressionIRLECompression(data) {
	let result = "";

	let prevChar = data[0];
	let curLength = 1;
	for (let i = 1; i < data.length; i++) {
		if ((data[i] != prevChar) || curLength == 9) {
			result += `${curLength}${prevChar}`;
			curLength = 0;
			prevChar = data[i];
		}
		curLength++;
	}
	result += `${curLength}${prevChar}`;

	return result;
}

function proper2ColoringofaGraph(data) {
	const g = Array.from({ length: data[0] }, () => []);
	for (const [u, v] of data[1]) {
		g[u].push(v);
		g[v].push(u);
	}

	const color = Array(data[0]).fill(-1);

	for (let start = 0; start < data[0]; start++) {
		if (color[start] !== -1) continue;

		color[start] = 0;
		const q = [start];

		while (q.length) {
			const u = q.shift();

			for (const v of g[u]) {
				if (color[v] == -1) {
					color[v] = 1 - color[u];
					q.push(v);
				} else if (color[v] == color[u]) {
					return [];
				}
			}
		}
	}

	return color;
}

function hammingCodesIntegertoEncodedBinary(data) {
	let bin = BigInt(data).toString(2);

	// parity bits needed
	let m = bin.length;
	let r = 0;
	while ((1 << r) < (m + r + 1)) r++;

	// array with parity positions
	let size = m + r + 1;
	let arr = new Array(size).fill('0');

	// data bits
	let dataIndex = 0;
	for (let i = 1; i < size; i++) {
		if ((i & (i - 1)) !== 0) {
			arr[i] = bin[dataIndex++];
		}
	}

	// parity bits at positions 1,2,4,8,...
	for (let p = 1; p < size; p <<= 1) {
		let count = 0;
		for (let i = p; i < size; i += 2 * p) {
			for (let j = i; j < i + p && j < size; j++) {
				if (arr[j] === '1') count++;
			}
		}
		arr[p] = (count % 2 === 0 ? '0' : '1');
	}

	// extended parity bit at position 0
	let totalOnes = arr.slice(1).filter(x => x === '1').length;
	arr[0] = (totalOnes % 2 === 0 ? '0' : '1');

	return arr.join('');
}

function uniquePathsinaGridII(data) {
	const r = data.length;
	const c = data[0].length;
	const dp = Array.from({ length: r }, () => Array(c).fill(0));

	if (data[0][0] == 1) return 0;
	dp[0][0] = 1;

	for (let i = 0; i < r; i++) {
		for (let j = 0; j < c; j++) {
			if (data[i][j] == 1) {
				dp[i][j] = 0;
				continue;
			}

			if (i > 0) dp[i][j] += dp[i - 1][j];
			if (j > 0) dp[i][j] += dp[i][j - 1];
		}
	}

	return dp[r - 1][c - 1];
}

function generateIPAddresses(data) {
	const result = [];

	function valid8bit(str) {
		if (str.length > 1 && str[0] == "0") return false;
		const n = Number(str);
		return n >= 0 && n <= 255;
	}

	const n = data.length;
	for (let i = 1; i <= 3; i++) {
		for (let j = i + 1; j <= i + 3; j++) {
			for (let k = j + 1; k <= j + 3; k++) {
				if (k >= n) continue;

				const a = data.slice(0, i);
				const b = data.slice(i, j);
				const c = data.slice(j, k);
				const d = data.slice(k);

				if (valid8bit(a) &&
					valid8bit(b) &&
					valid8bit(c) &&
					valid8bit(d)) {
					result.push(`${a}.${b}.${c}.${d}`);
				}
			}
		}
	}

	return result;
}

function totalNumberofPrimes(data) {
	const l = Number(data[0]);
	const r = Number(data[1]);

	const limit = Math.floor(Math.sqrt(r));
	const mark = new Array(limit + 1).fill(true);
	const primes = [];

	for (let i = 2; i <= limit; i++) {
		if (mark[i]) {
			primes.push(i);
			for (let j = i * i; j <= limit; j += i) {
				mark[j] = false;
			}
		}
	}

	const size = r - l + 1;
	const isPrime = new Array(size).fill(true);

	for (const p of primes) {
		let start = Math.max(p * p, Math.ceil(l / p) * p);

		for (let x = start; x <= r; x += p) {
			isPrime[x - l] = false;
		}
	}

	if (l === 0) isPrime[0] = false;
	if (l <= 1 && 1 <= r) isPrime[1 - l] = false;

	let count = 0;
	for (let i = 0; i < size; i++) {
		if (isPrime[i]) count++;
	}

	return count;
}

function squareRoot(data) {
	const n = BigInt(data.toString());
	if (n < 2n) return n.toString();

	let x = n;
	let y = (x + 1n) >> 1n;

	while (y < x) {
		x = y;
		y = (x + n / x) >> 1n;
	}

	const x2 = x * x;
	const x1 = x + 1n;
	const x12 = x1 * x1;

	const diffDown = n - x2;
	const diffUp = x12 - n;

	const res = diffUp <= diffDown ? x1 : x;
	return res.toString();
}

function encryptionIIVigenereCipher(data) {
	const a_char = "A".charCodeAt(0);
	let kl = 0;

	let result = "";
	for (let i = 0; i < data[0].length; i++) {
		const curChar = data[0].charCodeAt(i);

		if (curChar == 32) {
			result += " ";
			continue;
		}

		const p = curChar - a_char;
		const k = data[1].charCodeAt(kl) - a_char;
		const c = (p + k) % 26;

		result += String.fromCharCode(a_char + c);

		kl = (kl + 1) % data[1].length;
	}

	return result;
}

function uniquePathsinaGridI(data) {
	const n = data[0] + data[1] - 2;
	const k = Math.min(data[0] - 1, data[1] - 1);

	let res = 1;
	for (let i = 1; i <= k; i++) {
		res = res * (n - k + i) / i;
	}

	return Math.round(res);
}

function algorithmicStockTraderII(data) {
	let profit = 0;

	for (let i = 1; i < data.length; i++) {
		if (data[i] > data[i - 1]) {
			profit += data[i] - data[i - 1];
		}
	}

	return profit;
}

function subarraywithMaximumSum(data) {
	let maxSum = data[0];
	let curSum = 0;
	for (const num of data) {
		curSum = Math.max(num, curSum + num);
		maxSum = Math.max(curSum, maxSum);
	}

	return maxSum;
}

function largestRectangleinaMatrix(data) {
	const rows = data.length;
	const cols = data[0].length;

	const height = Array(cols).fill(0);

	let bestArea = 0;
	let bestRect = [[0, 0], [0, 0]];

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			height[c] = data[r][c] == 0 ? height[c] + 1 : 0;
		}

		const stack = [];
		let c = 0;
		while (c <= cols) {
			const h = c < cols ? height[c] : 0;

			if (stack.length == 0 || h >= height[stack[stack.length - 1]]) {
				stack.push(c++);
			} else {
				const top = stack.pop();
				const heightRect = height[top];
				const widthRect = stack.length === 0 ? c : c - stack[stack.length - 1] - 1;
				const area = heightRect * widthRect;

				if (area > bestArea) {
					bestArea = area;

					const r2 = r;
					const r1 = r - heightRect + 1;
					const c2 = c - 1;
					const c1 = c - widthRect;

					bestRect = [[r1, c1], [r2, c2]];
				}
			}
		}
	}

	return bestRect;
}

function encryptionICaesarCipher(data) {
	const a_char = "A".charCodeAt(0);
	const z_char = "Z".charCodeAt(0);

	let result = "";

	for (const ch of data[0]) {
		if (ch == " ") {
			result += " ";
			continue;
		}

		let code = ch.charCodeAt(0) - data[1];

		if (code < a_char) {
			code = z_char - (a_char - code - 1);
		}

		result += String.fromCharCode(code);
	}

	return result;
}

function mMinimumPathSuminaTriangle(data) {
	for (let i = 1; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			let left = Infinity;
			let right = Infinity;

			if (j != 0) left = data[i - 1][j - 1];
			if (j != data[i].length - 1) right = data[i - 1][j];

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
	const dp = Array(data + 1).fill(0);
	dp[0] = 1;

	for (let num = 1; num <= data; num++) {
		for (let s = num; s <= data; s++) {
			dp[s] += dp[s - num];
		}
	}

	return dp[data] - 1;
}

function spiralizeMatrix(data) {
	let left = 0;
	let right = data[0].length - 1;
	let top = 0;
	let bottom = data.length - 1;

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
		if (maxReach >= data.length - 1) return 1;
	}

	return 0;
}

function mergeOverlappingIntervals(data) {
	data.sort((a, b) => a[0] - b[0]);

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