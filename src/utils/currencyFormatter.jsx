const formatVnd = (number)=>{
    return new Intl.NumberFormat('vn-VN').format(number);
}

export default {formatVnd}