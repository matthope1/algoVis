class array {
    constructor () {
        this.length = 0;
        this.data = [];
    }

    getElementAt(index){
        return data[index];
    }

    append(key){
        this.data.push(key);
        this.length++;
    }
    
    delete(index) {
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    linearSearch(key) {

        let index = -1;

        for (let i = 0; i < this.length; i++ ) {
            if (this.data[i] == key) {
                index = i;
                break;
            }
        }
        return index;
    }

    binarySearch(key) {

        let l = 0;
        let r = this.length - 1;

        let mid;
        while (l <= r) {

            mid = Math.round((l + r) / 2);

            if (this.data[mid] == key) {
                return mid;
            }
            else if(this.data[mid] < key) {
                l = mid + 1;
            }
            else {
                r = mid - 1;
            }
        }

        // we didnt find the key return not found
        return -1;
    }

    sort() {
        this.data.sort(function(a,b){return a - b});
    }


    display(){
        console.log(this.data);
    }

}

function iOnlyPrint() {
    console.log("I only print");
}


let p = "p";

$(document).ready(function(){

    console.log("document ready");

    let arr = new array();

    // append 10 random numbers in the range 0 - 10
    let i = 0;

    while (i < 10) {
        let randomNum = Math.floor(Math.random() * 101);

        if(arr.linearSearch(randomNum) == -1) {
            arr.append(randomNum);
            i++;
        }
        else {
            continue;
        }
    }

    
    // arr.append(3);
    // arr.append(5);
    // arr.append(7);
    // arr.append(8);

    // sort numbers
    arr.sort();
    arr.display();

    console.log(arr.binarySearch(7));

    console.log("this happens");

    $(".click-green").on('click', iOnlyPrint);



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
