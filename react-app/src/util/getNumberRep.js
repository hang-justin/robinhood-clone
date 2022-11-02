const getNumberRep = (num) => {

    const units = ['M','B','T']
    const unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
    const r = unit % 3
    const x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return x.toFixed(2) + units[Math.floor(unit / 3) - 2]
}

export default getNumberRep
