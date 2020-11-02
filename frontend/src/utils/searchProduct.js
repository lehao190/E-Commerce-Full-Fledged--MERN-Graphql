var patients = [
    "Greg",
    "Anna",
    "Docker",
    "Slartibartfarst",
    "Einstein",
    "Dante",
    "Vergil",
    "Hao",
    "Olgra",
    "Ommae",
    "ommrity"
    ];

var input = "gr";
var re = new RegExp(input + '+', 'ig');
patients = patients.filter(function(e, i, a){
    return e.match(re);
});
console.log(patients);