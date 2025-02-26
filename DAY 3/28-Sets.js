let nums = new Set()

nums.add(1)
nums.add(2)
nums.add(3)
nums.add(4)

console.log(nums);

nums.forEach((num)=>{
    console.log(num);
}
)

console.log(nums.has(4));
