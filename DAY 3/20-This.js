// let laptop1 = {
//     cpu: 'i5',
//     ram: 8,
//     brand: 'Dell',
//     getConfig: function(){
//         console.log(this.cpu);
//     }
//     };

// let laptop2 = {
//     cpu: 'i7',
//     ram: 16,
//     brand: 'HP',
//      getConfig: function(){ 
//        console.log(this.cpu);

//     }
// }

// laptop1.getConfig();



let laptop1 = {
    cpu: 'i9',
    ram: 8,
    brand: 'Dell',
    compare: function (other) {
        if (this.cpu > other.cpu)
            console.log(this);
        else
            console.log(other);
    },
};


let laptop2 = {
    cpu: 'i7',
    ram: 16,
    brand: 'HP',
    compare: function (other) {
        if (this.cpu > other.cpu)
            console.log(this);
        else
            console.log(other);
    },
}

laptop2.compare(laptop1)