function sort(arr){
  let pivot = arr[0]
  let moreThan = []
  let lessThan = []
  if(arr.length === 0){
      return []
  }else{
      for(let i = 1; i < arr.length; i++){
          if(pivot.release_date.split('-')[0] <= arr[i].release_date.split('-')[0]){
              lessThan.push(arr[i])
          }
          else if(pivot.release_date.split('-')[0] >= arr[i].release_date.split('-')[0]){
              moreThan.push(arr[i])
          }
      }
      return sort(lessThan).concat(pivot, sort(moreThan))
  }
}

module.exports = sort