// How many stars does the product has ?
function rating(num, randomData) {
  let sNum = randomData.rating;
  return num < sNum ? "fa-solid fa-star active" : "fa-solid fa-star";
}

export default rating;
