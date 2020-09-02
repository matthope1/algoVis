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
        this.length++;
    }
    
    delete(index) {
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    display(){
        console.log(this.data);
    }

}


let p = "p";

$(document).ready(function(){

    console.log("document ready");

    let arr = new Array();

    arr.push(3);
    arr.push(5);
    arr.push(7);
    arr.push(8);

    arr.display();
     
    // $("button").click(function(){
    //    let box = document.createElement("div");
    //    box.className = "box";
    //    $(".container").append(box); 
    //    console.log("box created..")
    // });

    $("button").click(function() {
        let box;

        for (let i = 0; i < arr.length; i ++) {
            box = document.createElement("div");
            box.className = `box box-${arr.data[i]}`;
            console.log(`box box-${arr.data[i]}`);
            box.innerHTML = arr.data[i];

            $(".container").append(box); 
            // we only want to allow the user to make the array once 
            $("button").prop('disabled',true);
            
        }
        // if there reallly is a box3, its background will be pink.
        console.log("this happens");
        console.log("this also happens");
    });


   // let num = 6;

    // console.log(`number before the function call: ${num} `);

    // function myfunction(x)  {
    //     console.log(x);
    //     x = 7;
    //     console.log(x);

    //     return x;
    // }

    //     // let newNumber = myfunction(num);

    // num = myfunction(num);
    // // num = newNumber;

    // console.log(`number after the function call: ${num} `);
 

});
