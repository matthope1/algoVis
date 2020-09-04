class array {
    constructor () {
        this.length = 0;
        this.data = [];
    }

    getElementAt(index){
        return data[index];
    }

    append(value){
        this.data.push(value);
        this.length++;
    }
    
    delete(index) {
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    linearSearch(value) {

        let index = -1;

        for (let i = 0; i < this.length; i++ ) {
            if (this.data[i] == value) {
                index = i;
                break;
            }
        }
        return index;
    }


    display(){
        console.log(this.data);
    }

}


let p = "p";

$(document).ready(function(){

    console.log("document ready");

    let arr = new array();

    arr.append(3);
    arr.append(5);
    arr.append(7);
    arr.append(8);

    console.log("this happens");

    $(".click-green").on('click', function() {

        console.log("green's button was clicked...");
        $(".green-box").css("background-color", "blue");
    });


    $(".create_boxes").on ('click',function() {
        let box;

        for (let i = 0; i < arr.length; i ++) {
            box = document.createElement("div");
            box.className = `box box-${i}`;
            box.innerHTML = arr.data[i];

            $(".display").append(box); 
            // we only want to allow the user to make the array once 
            $(".create_boxes").prop('disabled',true);
        }

    });

    $(".add_item").click(function () {
        let box;

        //prompt user for the number to add
        let boxToBeAdded = prompt("what number to do you want to add to your array");

        //create the new div that will enclose the new array item
        box = document.createElement("div");

        // add class name based on the current length of the array
        box.className = `box box-${arr.length}`;

        // change the contents of the new div to the number given by the user
        box.innerHTML = boxToBeAdded;

        // add div to container
        $(".display").append(box);

        // add the new element to the storage array
        arr.append(parseInt(boxToBeAdded));


    });
});
