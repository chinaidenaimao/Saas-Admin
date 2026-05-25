// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepclone=(obj:any,map:WeakMap<any,any>=new WeakMap())=>{
  if(obj===null||typeof obj!=='object'){
    return obj;
  }
  if(map.has(obj)){
    return map.get(obj);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cloneObj: any = Array.isArray(obj) ? [] : {}
  map.set(obj,cloneObj);
  for(const key in obj)
  {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {

      cloneObj[key]=deepclone(obj[key],map);
    }
  }
  return cloneObj;
}
