// make a function that takes multiple "tag" values as parameters
//assemble the "tags" in an array
//join the Array using " OR " in between the "tags"

export function multiTag(...tags) {
    const multiTagArray = tags.join(' OR ');
    return multiTagArray;
  }