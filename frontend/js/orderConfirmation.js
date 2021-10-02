

//get customer that made an order information from local Storage
function getCustomer() {
  
    return localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')) : {};
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    document.getElementById('order_id').innerText = uuid
}

document.addEventListener('DOMContentLoaded', () => {
    
    const user = document.getElementById('userInfo')
    user.innerText = `Thank You ${getCustomer().firstname} ${getCustomer().surname}`
    create_UUID()
});
