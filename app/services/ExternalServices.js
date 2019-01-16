export const splitCategoryName = (string) => {
  let vals = {
    name: string,
    count: 0,
  };
  let matches = string.match(/\((.*?)\)/);
  if (matches) {
    vals.count = matches[1];
  }
  let name = string.split('(');
  if (name) {
    vals.name = name[0];
  }

  console.log(vals)

  return vals;
}