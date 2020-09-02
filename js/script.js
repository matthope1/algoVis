class Array {
    constructor () {
        this.length = 0;
        this.data = [];
    }

    getElementAt(index){
        return data[index];
    }

    push(value){
        this.data.push(value);
    }

    display(){
        console.log("data: ");
        console.log(this.data);
    }

}

let p = "p";

$(document).ready(function(){
    console.log("document ready");
     
    $("button").click(function(){
       let box = document.createElement("div");
       box.className = "box";
       $(".container").append(box); 
       console.log("box created..")
    });

    let num = 6;

    console.log(`number before the function call: ${num} `);

    function myfunction(x)  {
        console.log(x);
        x = 7;
        console.log(x);

        return x;
    }

        // let newNumber = myfunction(num);

    num = myfunction(num);
    // num = newNumber;

    console.log(`number after the function call: ${num} `);
 

});
