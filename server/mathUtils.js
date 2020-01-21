function union(lists){
  result = [];
  lists.forEach((x) => {
      x.forEach((y) => {
        if(!y in result){
          result.push(y);
        }
      });
  });
  return results;
}

module.exports = {
  union,
};
