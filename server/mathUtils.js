function union(lists){
  result = [];
  lists.forEach((x) => {
    // console.log(x);
      x.forEach((y) => {
        // console.log(y);
        if(!result.includes(y)){
          result.push(y);
          console.log(result);
        }
      });
  });
  return result;
}

module.exports = {
  union,
};
